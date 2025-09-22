import Header from "./Header";
import LeftNav from "./LeftNav";
import SearchOverlay from "./SearchOverlay";

import RightNav from "./RightNav";
import { useState } from "react";

import ScienceDocuments from "./ScienceDocuments";
import MathematicsDocuments from "./MathematicsDocuments";
import ProgrammingDocuments from "./ProgrammingDocuments";

const HomePage = ({
  leftNavRef, //passed down from App.js
  rightNavRef, //passed down from App.js
  openSearch, //passed down from App.js
  databaseNames, //passed down from App.js
  storage_path, //passed down from App.js
  isActive, //passed down from App.js
  onBack, //passed down from App.js
  inputRef, //passed down from App.js
  file_rating,
}) => {
  const [home_leftNavOpen, set_home_LeftNavOpen] = useState(false);
  const [home_rightNavOpen, set_home_RightNavOpen] = useState(false);

  const open_home_LeftNav = () => set_home_LeftNavOpen(true);
  const close_home_LeftNav = () => set_home_LeftNavOpen(false);

  const open_home_RightNav = () => set_home_RightNavOpen(true);
  const close_home_RightNav = () => set_home_RightNavOpen(false);

  const openRight = () => {
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
      <section className="container">
        {!isActive && (
          <>
            <Header
              showSearchLogo={true}
              isLeftNavOpen={home_leftNavOpen}
              openLeftNav={open_home_LeftNav}
              openSearch={openSearch}
              isRightNavOpen={home_rightNavOpen}
              closeRightNav={close_home_RightNav}
            />

            <LeftNav
              isOpen={home_leftNavOpen}
              closeLeftNav={close_home_LeftNav}
              leftNavRef={leftNavRef}
            />

            <RightNav
              rightNavRef={rightNavRef}
              closeRightNav={close_home_RightNav}
              isOpen={home_rightNavOpen}
            />

            <ScienceDocuments
              storage_path={storage_path}
              databaseNames={databaseNames}
              OpenRight={openRight}
              openInNewTab={openInNewTab}
              file_rating={file_rating}
            />
            <MathematicsDocuments
              storage_path={storage_path}
              databaseNames={databaseNames}
              OpenRight={openRight}
              openInNewTab={openInNewTab}
              file_rating={file_rating}
            />
            <ProgrammingDocuments
              storage_path={storage_path}
              databaseNames={databaseNames}
              file_rating={file_rating}
              OpenRight={openRight}
              openInNewTab={openInNewTab}
            />
          </>
        )}

        <SearchOverlay
          isActive={isActive}
          onBack={onBack}
          inputRef={inputRef}
        />
      </section>
      <div className="homePageFooter">
        <p>Contact</p>
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default HomePage;
