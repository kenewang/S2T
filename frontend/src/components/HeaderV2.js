import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./HeaderV2.css";
const HeaderV2 = ({
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

  const locationObj = useLocation();
  const currentPath = locationObj.pathname;

  const paths = ["/home/filemoderation", "/home", "/home/fileupload", "/faqs"];

  let location = paths.includes(currentPath);

  return (
    <div className="head">
      {" "}
      <span
        className="hamburger"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>
      {!location && (
        <div className="shortcuts">
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
      )}
      {location && (
        <div className="shortcuts">
          <p
            onClick={() => {
              navigate("/faqs");
            }}
          >
            FAQS
          </p>
        </div>
      )}
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

export default HeaderV2;
