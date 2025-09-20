import Header from "./Header";
import LeftNav from "./LeftNav";
import SearchOverlay from "./SearchOverlay";
import menu_icon from "../svg/iconmonstr-menu-dot-vertical-filled.svg";
import file_icon from "../svg/icons8-file-100.png";
import RightNav from "./RightNav";
import { useState } from "react";

const HomePage = ({
  leftNavRef,
  rightNavRef,
  openSearch,
  databaseNames,
  storage_path,
  isActive,
  onBack,
  inputRef,
}) => {
  const [home_leftNavOpen, set_home_LeftNavOpen] = useState(false);
  const [home_rightNavOpen, set_home_RightNavOpen] = useState(false);

  const open_home_LeftNav = () => set_home_LeftNavOpen(true);
  const close_home_LeftNav = () => set_home_LeftNavOpen(false);

  const open_home_RightNav = () => set_home_RightNavOpen(true);
  const close_home_RightNav = () => set_home_RightNavOpen(false);

  const OpenRight = () => {
    if (home_leftNavOpen) {
      close_home_LeftNav();
      open_home_RightNav();
    } else open_home_RightNav();
  };

  const openInNewTab = (url) => {
    if (!home_rightNavOpen && !home_leftNavOpen) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      close_home_RightNav();
      close_home_LeftNav();
    }
  };

  return (
    <div>
      {!isActive && (
        <>
          <Header
            showSearchLogo={true}
            isLeftNavOpen={home_leftNavOpen}
            openLeftNav={open_home_LeftNav}
            openSearch={openSearch}
            isRightNavOpen={false}
            closeRightNav={close_home_RightNav}
          />

          <LeftNav
            isOpen={home_leftNavOpen}
            closeLeftNav={close_home_LeftNav}
            leftNavRef={leftNavRef}
          />

          <section className="homePage-document-container">
            {databaseNames.map((item, i) => {
              const extIndex = item.lastIndexOf(".");
              const name = extIndex === -1 ? item : item.slice(0, extIndex);
              const ext = extIndex === -1 ? "" : item.slice(extIndex);

              // pick a storage_path for this file
              const link = storage_path[i];

              return (
                <div className="document" key={i}>
                  <img
                    className="file_icon"
                    src={file_icon}
                    alt="file_icon"
                    onClick={() => openInNewTab(link)} //use an arrow function to avoid calling the function immediately since this function takes an argument.
                  />
                  {/* Three-dot menu */}
                  <img
                    className="three_dot"
                    src={menu_icon}
                    alt="Options"
                    onClick={OpenRight}
                  />
                  {/* File name */}
                  <p
                    className="truncate-middle"
                    onClick={() => openInNewTab(link)}
                  >
                    <span className="start">{name}</span>
                    <span className="end">{ext}</span>
                  </p>
                </div>
              );
            })}

            <RightNav
              rightNavRef={rightNavRef}
              closeRightNav={close_home_RightNav}
              isOpen={home_rightNavOpen}
            />
          </section>
        </>
      )}

      <SearchOverlay isActive={isActive} onBack={onBack} inputRef={inputRef} />

      <div className="homePageFooter">
        <p>Contact</p>
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default HomePage;
