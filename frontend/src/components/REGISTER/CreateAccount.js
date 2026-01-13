import CreateAccountHeader from "./CreateAccountHeader";
import LeftNav from "../LeftNav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const CreateAccount = ({
  leftNavOpen,
  leftNavRef,
  openLeftNav,
  closeLeftNav,
  setAuth,

  isAuthenticated,

  onRatingSubmitted,
}) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    if (!leftNavOpen) navigate("/login");
  };

  const API_URL = process.env.REACT_APP_API_URL;

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    fname: "",
    lname: "",
    username: "",
  });

  const { email, password, fname, lname, username } = inputs; //object destructuring

  const onChange = (e) => {
    //When you type in a form field, onChange updates the inputs state so that only the field you changed gets updated, while the rest stay the same.
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, fname, lname, username };
      /* 
           shortcut for: 
            const body = {email: email, password: password, Fname: Fname, Lname: Lname, username: username };
      */

      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //This tells  Spring Boot server that the stuff in the body is in json format
        body: JSON.stringify(body),
        credentials: "include", // Important for cookies/sessions
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        navigate("/home");
      } else {
        alert(parseRes.msg || "Registration failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    document.title = "Share2Teach - Create Account";
    const token = localStorage.getItem("token");
    if (token) {
      // If already logged in, redirect to home
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="createAccWrapper">
      <CreateAccountHeader
        showSearchLogo={false} //hide the search icon
        leftNavOpen={leftNavOpen}
        openLeftNav={openLeftNav}
        // Pass other props if you need search/right nav to work:

        closeRightNav={() => {}}
        showLoginCreate={false}
        showPCSearch={false}
      />
      <LeftNav
        leftNavOpen={leftNavOpen}
        closeLeftNav={closeLeftNav}
        leftNavRef={leftNavRef}
        isAuthenticated={isAuthenticated}
        setAuth={setAuth}
        onRatingSubmitted={onRatingSubmitted}
      />

      <section className="createAccount">
        <h2 className="register-heading">Create Account</h2>
        <form className="createAccountCredentials" onSubmit={onSubmitForm}>
          <label>First Name</label>
          <input
            type="text"
            className="inputCreateAccount"
            placeholder="First Name"
            onChange={onChange}
            value={fname}
            name="fname"
            required
          ></input>

          <label>Last Name</label>

          <input
            type="text"
            name="lname"
            className="inputCreateAccount"
            placeholder="Last Name"
            onChange={onChange}
            value={lname}
            required
          ></input>
          <label>Username</label>

          <input
            type="text"
            name="username"
            className="inputCreateAccount"
            placeholder="Username"
            onChange={onChange}
            value={username}
            required
          ></input>
          <label>Emai</label>

          <input
            type="text"
            name="email"
            className="inputCreateAccount"
            placeholder="Email"
            value={email}
            onChange={onChange}
            required
          ></input>
          <label>Password</label>

          <input
            type="password"
            name="password"
            className="inputCreateAccount"
            placeholder="Password"
            value={password}
            onChange={onChange}
            autoComplete="new-password"
            required
          ></input>
          <button className="reg-button" type="submit">
            Create Account
          </button>
        </form>

        <div className="divider">or</div>
        <div className="toCreateAccount">
          <label>Already have an account?</label>
          <label className="loginLabel" onClick={goToLogin}>
            Log in
          </label>
        </div>
      </section>

      <div className="create_account_Footer">
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};
export default CreateAccount;
