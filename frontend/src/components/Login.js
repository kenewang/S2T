import HeaderV2 from "./HeaderV2";
import LeftNav from "./LeftNav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Login = ({
  leftNavOpen,
  leftNavRef,
  openLeftNav,
  closeLeftNav,
  setAuth,
  isAuthenticated,
  showSearchLogo,
  onRatingSubmitted,
}) => {
  const navigate = useNavigate();
  const goToCreateAccount = () => {
    if (!leftNavOpen) navigate("/createAccount");
  };

  const [inputs, setInputs] = useState({ email: "", password: "" });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch("http://localhost:8081/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken); //store jwt token in the browser
        setAuth(true);
        navigate("/home");
      } else {
        alert(parseRes.msg || "Login failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If already logged in, redirect to home
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="loginWrap">
      <HeaderV2
        leftNavOpen={leftNavOpen}
        openLeftNav={openLeftNav}
        // Pass other props if you need search/right nav to work:
        openSearch={() => {}}
        rightNavOpen={false}
        closeRightNav={() => {}}
      />
      <LeftNav
        leftNavOpen={leftNavOpen}
        closeLeftNav={closeLeftNav}
        leftNavRef={leftNavRef}
        isAuthenticated={isAuthenticated}
        setAuth={setAuth}
        onRatingSubmitted={onRatingSubmitted}
      />

      <section className="login">
        <form className="loginCredentials" onSubmit={onSubmitForm}>
          <label>Email</label>
          <input
            className="inputLogin"
            placeholder="Email"
            value={email}
            name="email"
            onChange={onChange}
          ></input>
          <div className="password_labels">
            <label className="password_label">Password</label>
            <label className="forgot_password_label">Forgot password?</label>
          </div>
          <input
            className="inputLogin"
            placeholder="Password"
            value={password}
            name="password"
            onChange={onChange}
          ></input>
          <button>Log in</button>
        </form>

        <div className="divider">or</div>
        <div className="toCreateAccount">
          <label>New to Share2Teach?</label>
          <label className="createAccountLabel" onClick={goToCreateAccount}>
            Create an Account
          </label>
        </div>
      </section>

      <div className="loginFooter">
        <p>Contact</p>
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};
export default Login;
