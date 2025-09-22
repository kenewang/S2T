import Header from "./Header";
import LeftNav from "./LeftNav";
import { useNavigate } from "react-router-dom";

const Login = ({ leftNavOpen, leftNavRef, openLeftNav, closeLeftNav }) => {
  const navigate = useNavigate();
  const goToCreateAccount = () => {
    if (!leftNavOpen) navigate("/createAccount");
  };
  return (
    <div>
      <Header
        showSearchLogo={false} //hide the search icon
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
      />

      <section className="login">
        <form className="loginCredentials">
          <label>Email</label>
          <input className="inputLogin" placeholder="Email"></input>
          <div className="password_labels">
            <label className="password_label">Password</label>
            <label className="forgot_password_label">Forgot password?</label>
          </div>
          <input className="inputLogin" placeholder="Password"></input>
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
