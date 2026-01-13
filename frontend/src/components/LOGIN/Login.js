import LoginHeader from "./LoginHeader";
import LeftNav from "../LeftNav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import eye from "../../svg/eye.png";
import eyeOff from "../../svg/eyeOff.png";
import "./Login.css";
import Swal from "sweetalert2";

const Login = ({
  leftNavOpen,
  leftNavRef,
  openLeftNav,
  closeLeftNav,
  setAuth,
  isAuthenticated,

  onRatingSubmitted,
}) => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");

  const navigate = useNavigate();
  const goToCreateAccount = () => {
    if (!leftNavOpen) navigate("/createAccount");
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
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

      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include", // Important for cookies/sessions
      });

      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken); //store jwt token in the browser
        setAuth(true);
        navigate("/home");
      } else {
        Swal.fire({
          title: "Error",
          text: "Login Failed",
          icon: "error",
          customClass: {
            popup: "login-popup-error",
            title: "login-popup-error-title",
            icon: "login-popup-error-icon",
          },
        });
      }
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "Login Failed",
        icon: "error",
        customClass: {
          popup: "login-popup-error",
          title: "login-popup-error-title",
          icon: "login-popup-error-icon",
        },
      });
    }
  };

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include", // Important for cookies/sessions
      });

      const parseRes = await response.json();
      setForgotPasswordMessage(
        parseRes.msg || "Password reset link sent to your email!"
      );
    } catch (err) {
      console.error(err.message);
      setForgotPasswordMessage("Error sending password reset link.");
    }
  };

  useEffect(() => {
    document.title = "Share2Teach - Log In";
    const token = localStorage.getItem("token");
    if (token) {
      // If already logged in, redirect to home
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="loginWrap">
      <LoginHeader
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
        <h2 className="login_heading">Log In</h2>
        <form className="loginCredentials" onSubmit={onSubmitForm}>
          <label>Email</label>
          <input
            className="inputLogin"
            placeholder="Email"
            value={email}
            name="email"
            onChange={onChange}
            required
          ></input>
          <div className="password_labels">
            <label className="password_label">Password</label>
            <label
              className="forgot_password_label"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </label>
          </div>
          <div className="password_input_wrap">
            <input
              className="inputLogin"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              name="password"
              onChange={onChange}
              required
              autoComplete="new-password"
            ></input>

            <img
              className="hide-unhide"
              src={showPassword ? eye : eyeOff}
              onClick={togglePassword}
              alt="toggle visibility"
            />
          </div>

          {forgotPasswordMessage && (
            <p className="forgot-password-message">{forgotPasswordMessage}</p>
          )}

          <button className="log-in-button">Log in</button>
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
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};
export default Login;
