import { useNavigate } from "react-router-dom";

const LoginBrowse = ({ isRightNavOpen, isLeftNavOpen }) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    if (!isRightNavOpen && !isLeftNavOpen) navigate("/login");
  };

  const gotoSubjects = () => {
    if (!isRightNavOpen && !isLeftNavOpen) navigate("/subjects");
  };
  return (
    <div className="login-browse">
      <button onClick={goToLogin} className="login-button">
        Login
      </button>

      <button onClick={gotoSubjects} className="browse-button">
        Browse
      </button>
    </div>
  );
};
export default LoginBrowse;
