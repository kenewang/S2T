import { useEffect, useState } from "react";
import icon from "../../svg/iconmonstr-magnifier-lined.svg";

import search from "../../svg/icons8-search-50.png";
import uploadIcon from "../../svg/icons8-upload-100.png";
import "./HomePageHeader.css";
import { useNavigate, useLocation } from "react-router-dom";

const HomePageHeader = ({
  showSearchLogo,
  showUploadIcon,
  leftNavOpen,
  openLeftNav,
  openSearch,
  rightNavOpen,
  closeRightNav,
  setHideElements,
  setValue,
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
    <header
      className={
        showUploadIcon ? "homepage-big-header" : "homepage-small-header"
      }
      id="main-header"
    >
      <span
        className="homepage-menu-icon"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>

      <div
        className={
          showUploadIcon
            ? "homepage-pc-screen-search"
            : "homepage-pc-screen-search-allowed"
        }
      >
        <form
          className={
            showUploadIcon
              ? "homepage-pc-screen-search-form"
              : "homepage-pc-screen-search-form-allowed"
          }
          onSubmit={handleSubmit}
        >
          <img src={search} alt="search_icon" />
          <input
            type="text"
            placeholder="Search for a document"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleEnterPress}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {showUploadIcon && (
        <div className="homepage-shortcuts">
          <p
            onClick={() => {
              navigate("/home/filemoderation");
            }}
          >
            File Moderation
          </p>

          <p
            className="faq-upload-icon"
            role="button"
            onClick={() => {
              navigate("/home/fileupload");
            }}
          >
            <span>Upload</span>
            <img src={uploadIcon} alt="Upload Icon" />
          </p>

          <p
            onClick={() => {
              navigate("/home/reports");
            }}
          >
            Reports
          </p>
        </div>
      )}

      {!showUploadIcon && (
        <p
          className="homepage-para"
          onClick={() => {
            navigate("/faqs");
          }}
        >
          Faqs
        </p>
      )}

      <div
        className="search-icon"
        id="search-btn"
        onClick={openSearchIcon}
        role="button"
      >
        {showSearchLogo && <img src={icon} alt="search_icon" />}
      </div>

      <h2
        className="homepage-s2t-heading"
        onClick={() => {
          navigate("/home");
          window.location.reload();
        }}
      >
        Share2Teach
      </h2>
    </header>
  );
};

export default HomePageHeader;
