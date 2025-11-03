import { useEffect } from "react";
import icon from "../svg/iconmonstr-magnifier-lined.svg";
import uploadIcon from "../svg/icons8-upload-100.png";
import search from "../svg/icons8-search-50.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";
const Header = ({
  showSearchLogo,
  showUploadIcon,
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
    <header id="main-header">
      <span
        className="menu-icon"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>

      <div className="pc-screen-search">
        <form className="pc-screen-search-form">
          <img src={search} alt="search_icon" />
          <input type="text" placeholder="search for a document" />
          <button type="submit">Search </button>
        </form>
      </div>

      <p
        className="login-word"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </p>

      <p className="create-word">Create Account</p>

      <div
        className="search-icon"
        id="search-btn"
        onClick={openSearchIcon}
        role="button"
      >
        {showSearchLogo && <img src={icon} alt="search_icon" />}
      </div>

      <div
        className="upload-icon"
        role="button"
        onClick={() => {
          navigate("/home/fileUpload");
        }}
      >
        {console.log(showUploadIcon)}
        {showUploadIcon && <span>Upload</span>}
        {showUploadIcon && <img src={uploadIcon} />}
      </div>
      <h2 className="s2t-heading">Share2Teach</h2>
    </header>
  );
};

export default Header;
