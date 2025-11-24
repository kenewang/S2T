import { useEffect } from "react";
import icon from "../../svg/iconmonstr-magnifier-lined.svg";

import search from "../../svg/icons8-search-50.png";
import "./SubjectsHeader.css";
import { useNavigate, useLocation } from "react-router-dom";

const SubjectsHeader = ({
  showSearchLogo,

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
    <header className="subjects-header" id="main-header">
      <span
        className="subjectHeader-menu-icon"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>

      <div className="subject-pc-screen-search">
        <form className="subject-pc-screen-search-form">
          <img src={search} alt="search_icon" />
          <input type="text" placeholder="Search for a document" />
          <button type="submit">Search </button>
        </form>
      </div>

      <div className="subjects-login-create">
        <p
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </p>

        <p
          onClick={() => {
            navigate("/createAccount");
          }}
        >
          Create Account
        </p>
        <p
          onClick={() => {
            navigate("/faqs");
          }}
        >
          Faqs
        </p>
      </div>

      <div
        className="search-icon"
        id="search-btn"
        onClick={openSearchIcon}
        role="button"
      >
        {showSearchLogo && <img src={icon} alt="search_icon" />}
      </div>

      <h2
        className="subjects-s2t-heading"
        onClick={() => {
          navigate("/");
        }}
      >
        Share2Teach
      </h2>
    </header>
  );
};

export default SubjectsHeader;
