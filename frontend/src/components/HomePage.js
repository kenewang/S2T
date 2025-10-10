import Header from "./Header";
import LeftNav from "./LeftNav";
import SearchOverlay from "./SearchOverlay";

import RightNav from "./RightNav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScienceDocuments from "./ScienceDocuments";
import MathematicsDocuments from "./MathematicsDocuments";
import ProgrammingDocuments from "./ProgrammingDocuments";

const HomePage = ({
  leftNavRef, //passed down from App.js
  rightNavRef, //passed down from App.js
  openSearch, //passed down from App.js
  databaseNames, //passed down from App.js
  storage_path, //passed down from App.js
  searchActive, //passed down from App.js
  closeSearch, //passed down from App.js
  searchInputRef, //passed down from App.js
  file_rating,
  isAuthenticated,
  setAuth,
}) => {
  const [leftNavOpen, setLeftNavOpen] = useState(false);
  const [rightNavOpen, setRightNavOpen] = useState(false);

  const openLeftNav = () => setLeftNavOpen(true);
  const closeLeftNav = () => setLeftNavOpen(false);

  const openRightNav = () => setRightNavOpen(true);
  const closeRightNav = () => setRightNavOpen(false);

  const navigate = useNavigate();

  const openRight = () => {
    if (leftNavOpen) {
      closeLeftNav();
      openRightNav();
    } else openRightNav();
  };

  const openInNewTab = (url) => {
    if (!rightNavOpen && !leftNavOpen) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      closeRightNav();
      closeLeftNav();
    }
  };

  const handleClick = (id) => {
    if (!rightNavOpen && !leftNavOpen) navigate(`/documents/${id}`); // go to the page with the id
  };

  return (
    <div>
      <section className="container">
        {!searchActive && (
          <>
            <Header
              showSearchLogo={true}
              leftNavOpen={leftNavOpen}
              openLeftNav={openLeftNav}
              openSearch={openSearch}
              rightNavOpen={rightNavOpen}
              closeRightNav={closeRightNav}
            />

            <LeftNav
              leftNavOpen={leftNavOpen}
              closeLeftNav={closeLeftNav}
              leftNavRef={leftNavRef}
              isAuthenticated={isAuthenticated}
              setAuth={setAuth}
            />

            <RightNav
              rightNavRef={rightNavRef}
              closeRightNav={closeRightNav}
              rightNavOpen={rightNavOpen}
            />

            <ScienceDocuments
              handleClick={handleClick}
              storage_path={storage_path}
              databaseNames={databaseNames}
              OpenRight={openRight}
              openInNewTab={openInNewTab}
              file_rating={file_rating}
            />
            <MathematicsDocuments
              handleClick={handleClick}
              storage_path={storage_path}
              databaseNames={databaseNames}
              OpenRight={openRight}
              openInNewTab={openInNewTab}
              file_rating={file_rating}
            />
            <ProgrammingDocuments
              handleClick={handleClick}
              storage_path={storage_path}
              databaseNames={databaseNames}
              file_rating={file_rating}
              OpenRight={openRight}
              openInNewTab={openInNewTab}
            />
          </>
        )}

        <SearchOverlay
          searchActive={searchActive}
          closeSearch={closeSearch}
          searchInputRef={searchInputRef}
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
