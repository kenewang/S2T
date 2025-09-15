import Header from "./Header";
import LeftNav from "./LeftNav";
import { useNavigate } from "react-router-dom";
const CreateAccount = ({ isOpen, leftNavRef, openLeftNav, closeLeftNav }) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    if (!isOpen) navigate("/login");
  };
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

      <section className="createAccount">
        <form className="createAccountCredentials">
          <label>First Name</label>
          <input
            className="inputCreateAccount"
            placeholder="First Name"
          ></input>

          <label>Last Name</label>

          <input className="inputCreateAccount" placeholder="Last Name"></input>
          <label>Username</label>

          <input className="inputCreateAccount" placeholder="Username"></input>
          <label>Emai</label>

          <input className="inputCreateAccount" placeholder="Email"></input>
          <label>Password</label>

          <input className="inputCreateAccount" placeholder="Password"></input>
          <button>Create Account</button>
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
        <p>Contact</p>
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};
export default CreateAccount;
