import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateAccountHeader.css";
const CreateAccountHeader = ({
  leftNavOpen,
  openLeftNav,

  closeRightNav,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!leftNavOpen) return;
    else {
      closeRightNav();
    }
  });

  return (
    <div className="register-wrapper">
      {" "}
      <span
        className="register-hamburger"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>
      <div className="register-shortcuts">
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
          window.location.reload();
        }}
      >
        Share2Teach
      </h2>
    </div>
  );
};

export default CreateAccountHeader;
