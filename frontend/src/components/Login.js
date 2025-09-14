import Header from "./Header";
import LeftNav from "./LeftNav";

const Login = ({ isOpen, leftNavRef, openLeftNav, closeLeftNav }) => {
  return (
    <div>
      <Header
        showSearchLogo={false} //hide the search icon
        isLeftNavOpen={isOpen}
        openLeftNav={openLeftNav}
        // Pass other props if you need search/right nav to work:
        openSearch={() => {}}
        isRightNavOpen={false}
        closeRightNav={() => {}}
      />
      <LeftNav
        isOpen={isOpen}
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
        <div className="createAccount">
          <label>New to Share2Teach?</label>
          <label className="createAccountLabel">Create an Account</label>
        </div>
      </section>

      <div className="copyright">&copy; 2025 Share2Teach</div>
    </div>
  );
};
export default Login;
