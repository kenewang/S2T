import { useNavigate } from "react-router-dom";

const LoginBrowse = ({ isRightNavOpen, isLeftNavOpen }) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    if (!isRightNavOpen && !isLeftNavOpen) navigate("/login");
  };
  return (
    <div className="login-browse">
      <button onClick={goToLogin} className="login-button">
        Login
      </button>

      <button className="browse-button">Browse</button>
    </div>
  );
};
export default LoginBrowse;
