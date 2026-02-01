import { useEffect, useState } from "react";
import icon from "../../svg/iconmonstr-magnifier-lined.svg";

import search from "../../svg/icons8-search-50.png";
import "./SubjectsHeader.css";
import { useNavigate } from "react-router-dom";

const SubjectsHeader = ({
  showSearchLogo,
  setHideElements,
  setValue,
  leftNavOpen,
  openLeftNav,
  openSearch,
  rightNavOpen,
  closeRightNav,
}) => {
  const [searchValue, setSearchValue] = useState("");
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

  const runSearch = () => {
    const value = searchValue.trim();

    if (value !== "") {
      setHideElements(true);
      setValue(value);
      console.log("Searching for:", value);
    } else {
      console.log("No text");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch();
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      runSearch();
    }
  };

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
        <form className="subject-pc-screen-search-form" onSubmit={handleSubmit}>
          <img src={search} alt="search_icon" />
          <input
            type="text"
            placeholder="Search for a document"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleEnterPress}
          />
          <button type="submit">Search </button>
        </form>
      </div>

      <div className="subjects-login-create">
        <p
          onClick={() => {
            navigate("/login");
          }}
        >
          LOG IN
        </p>

        <p
          onClick={() => {
            navigate("/createAccount");
          }}
        >
          CREATE ACCOUNT
        </p>
        <p
          onClick={() => {
            navigate("/faqs");
          }}
        >
          FAQS
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
          window.location.reload();
        }}
      >
        Share2Teach
      </h2>
    </header>
  );
};

export default SubjectsHeader;
