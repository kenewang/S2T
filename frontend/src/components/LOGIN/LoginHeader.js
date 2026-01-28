import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginHeader.css";
const LoginHeader = ({
  leftNavOpen,
  openLeftNav,
  openSearch,
  rightNavOpen,
  closeRightNav,
  isAuthenticated,
}) => {
  const openSearchIcon = () => {
    if (!rightNavOpen && !leftNavOpen) {
      openSearch();
    } else {
      closeRightNav();
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!leftNavOpen) return;
    else {
      closeRightNav();
    }
  });

  const goHome = () => {
    if (isAuthenticated) {
      navigate("/home");
      window.location.reload();
    } else {
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="login-head">
      {" "}
      <span
        className="login-hamburger"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>
      <div className="login-shortcuts">
        <button
          className="s-cuts"
          onClick={() => {
            navigate("/subjects");
          }}
        >
          BROWSE
        </button>
        <button
          className="s-cuts"
          onClick={() => {
            navigate("/faqs");
          }}
        >
          FAQS
        </button>
      </div>
      <h2
        onClick={() => {
          goHome();
        }}
      >
        Share2Teach
      </h2>
    </div>
  );
};

export default LoginHeader;
