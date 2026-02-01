import { useNavigate } from "react-router-dom";

const LoginBrowse = ({ rightNavOpen, leftNavOpen }) => {
  const navigate = useNavigate();
  const goToLogin = () => {
    if (!rightNavOpen && !leftNavOpen) navigate("/login");
  };

  const gotoSubjects = () => {
    if (!rightNavOpen && !leftNavOpen) navigate("/subjects");
  };
  return (
    <div className="login-browse">
      <button onClick={goToLogin} className="login-button">
        LOGIN
      </button>

      <button onClick={gotoSubjects} className="browse-button">
        BROWSE
      </button>
    </div>
  );
};
export default LoginBrowse;
