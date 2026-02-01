import { useEffect } from "react";
import icon from "../../svg/iconmonstr-magnifier-lined.svg";

import search from "../../svg/icons8-search-50.png";
import uploadIcon from "../../svg/icons8-upload-100.png";
import "./SDHeader.css";
import { useNavigate, useLocation } from "react-router-dom";

const SDHeader = ({
  showSearchLogo,
  showUploadIcon,
  leftNavOpen,
  openLeftNav,
  openSearch,
  rightNavOpen,
  closeRightNav,

  showPCSearch,
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
    <header
      className={showUploadIcon ? "s-big-header" : "s-small-header"}
      id="main-header"
    >
      <span
        className="s-menu-icon"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>

      <div
        className={
          showUploadIcon ? "s-pc-screen-search" : "s-pc-screen-search-allowed"
        }
      >
        <form
          className={
            showUploadIcon
              ? "s-pc-screen-search-form"
              : "s-pc-screen-search-form-allowed"
          }
        >
          <img src={search} alt="search_icon" />
          <input type="text" placeholder="Search for a document" />
          <button type="submit">Search</button>
        </form>
      </div>

      {showUploadIcon && (
        <div className="s-shortcuts">
          <p
            onClick={() => {
              navigate("/home/filemoderation");
            }}
          >
            FILE MODERATION
          </p>

          <p
            className="faq-upload-icon"
            role="button"
            onClick={() => {
              navigate("/home/fileupload");
            }}
          >
            UPLOAD
          </p>

          <p
            onClick={() => {
              navigate("/home/reports");
            }}
          >
            REPORTS
          </p>
        </div>
      )}

      {!showUploadIcon && (
        <p
          className="s-para"
          onClick={() => {
            navigate("/faqs");
          }}
        >
          FAQS
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
        className="s-s2t-heading"
        onClick={() => {
          navigate("/home");
        }}
      >
        Share2Teach
      </h2>
    </header>
  );
};

export default SDHeader;
