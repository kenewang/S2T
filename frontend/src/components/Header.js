import { useEffect } from "react";
import icon from "../svg/iconmonstr-magnifier-lined.svg";
import uploadIcon from "../svg/icons8-upload-100.png";
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
      <div
        className="search-icon"
        id="search-btn"
        onClick={openSearchIcon}
        role="button"
      >
        {console.log(showSearchLogo)}
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
        {showUploadIcon && <img src={uploadIcon} alt="upload_icon" />}
      </div>
      <h2>Share2Teach</h2>
    </header>
  );
};

export default Header;
