import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      <h2
        onClick={() => {
          navigate("/");
        }}
      >
        Share2Teach
      </h2>
    </div>
  );
};

export default HeaderV2;
