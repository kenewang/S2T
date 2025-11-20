import { useEffect } from "react";
import icon from "../svg/iconmonstr-magnifier-lined.svg";
import uploadIcon from "../svg/icons8-upload-100.png";
import search from "../svg/icons8-search-50.png";
import "./Header.css";
import { useNavigate, useLocation } from "react-router-dom";

const Header = ({
  showSearchLogo,
  showUploadIcon,
  leftNavOpen,
  openLeftNav,
  openSearch,
  rightNavOpen,
  closeRightNav,
  showLoginCreate,
  showPCSearch,
}) => {
  const locationObj = useLocation();
  const currentPath = locationObj.pathname;

  const paths = ["/home/filemoderation", "/home", "/home/fileupload", "/faqs"];

  let location = paths.includes(currentPath);

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
      className={showUploadIcon ? "big-header" : "small-header"}
      id="main-header"
    >
      <span
        className="menu-icon"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>

      {showPCSearch && (
        <div
          className={
            showUploadIcon ? "pc-screen-search_logged" : "pc-screen-search"
          }
        >
          <form
            className={
              showUploadIcon
                ? "pc-screen-search-form_logged"
                : "pc-screen-search-form"
            }
          >
            <img src={search} alt="search_icon" />
            <input type="text" placeholder="Search for a document" />
            <button type="submit">Search </button>
          </form>
        </div>
      )}

      {showLoginCreate && (
        <div className="login_create">
          <p
            onClick={() => {
              navigate("/login");
            }}
          >
            Log in
          </p>

          <p
            onClick={() => {
              navigate("/createAccount");
            }}
          >
            Create Account
          </p>
        </div>
      )}

      <div
        className="search-icon"
        id="search-btn"
        onClick={openSearchIcon}
        role="button"
      >
        {showSearchLogo && <img src={icon} alt="search_icon" />}
      </div>

      <div
        className="file-moderation"
        onClick={() => {
          navigate("/home/filemoderation");
        }}
        role="button"
      >
        {showUploadIcon && <span>File Moderation</span>}
      </div>

      <div
        className="upload-icon"
        role="button"
        onClick={() => {
          navigate("/home/fileupload");
        }}
      >
        {showUploadIcon && <span className="upload">Upload</span>}
        {showUploadIcon && <img src={uploadIcon} />}
      </div>

      <div className="reports" role="button">
        {showUploadIcon && <span>Reports</span>}
      </div>

      {location && (
        <h2
          className="s2t_heading"
          onClick={() => {
            navigate("/home");
          }}
        >
          Share2Teach
        </h2>
      )}
      {!location && (
        <h2
          className={showUploadIcon ? "s2t-heading-open" : "s2t-heading-closed"}
        >
          Share2Teach
        </h2>
      )}
    </header>
  );
};

export default Header;
