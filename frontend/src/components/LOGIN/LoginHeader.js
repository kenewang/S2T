import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginHeader.css";
const LoginHeader = ({
  leftNavOpen,
  openLeftNav,
  openSearch,
  rightNavOpen,
  closeRightNav,
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
        <p
          onClick={() => {
            navigate("/subjects");
          }}
        >
          Browse
        </p>
        <p
          onClick={() => {
            navigate("/faqs");
          }}
        >
          FAQS
        </p>
      </div>
      <h2
        onClick={() => {
          navigate("/home");
        }}
      >
        Share2Teach
      </h2>
    </div>
  );
};

export default LoginHeader;
