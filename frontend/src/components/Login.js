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
          <label>Password</label>
          <input className="inputLogin" placeholder="Password"></input>
          <button>Log in</button>
        </form>
      </section>

      <div className="copyright">&copy; 2025 Share2Teach</div>
    </div>
  );
};
export default Login;
