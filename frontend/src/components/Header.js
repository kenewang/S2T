import { useEffect } from "react";
import icon from "../svg/iconmonstr-magnifier-lined.svg";
import "./Header.css";
const Header = ({
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
        {showSearchLogo && <img src={icon} alt="search_icon" />}
      </div>
      <h2>Share2Teach</h2>
    </header>
  );
};

export default Header;
