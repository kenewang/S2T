import { Link, useNavigate } from "react-router-dom";

const LoginBrowse = ({ isRightNavOpen }) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    if (!isRightNavOpen) navigate("/login");
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
