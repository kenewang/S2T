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
  fileIds,
  activeFileId,
  setActiveFileId,
  onRatingSubmitted,
}) => {
  const [leftNavOpen, setLeftNavOpen] = useState(false);
  const [rightNavOpen, setRightNavOpen] = useState(false);

  const openLeftNav = () => setLeftNavOpen(true);
  const closeLeftNav = () => setLeftNavOpen(false);

  const openRightNav = () => setRightNavOpen(true);
  const closeRightNav = () => setRightNavOpen(false);

  const navigate = useNavigate();

  const openRight = (fileId) => {
    setActiveFileId(fileId); // 👈 store the file being rated
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
              activeFileId={activeFileId}
              onRatingSubmitted={onRatingSubmitted} // <-- pass callback
            />

            <ScienceDocuments
              handleClick={handleClick}
              OpenRight={openRight}
              openInNewTab={openInNewTab}
              fileIds={fileIds} // 👈 must come from backend fetch
              setActiveFileId={setActiveFileId}
            />
            <MathematicsDocuments
              handleClick={handleClick}
              OpenRight={openRight}
              openInNewTab={openInNewTab}
              fileIds={fileIds} // 👈 must come from backend fetch
              setActiveFileId={setActiveFileId}
            />
            <ProgrammingDocuments
              handleClick={handleClick}
              OpenRight={openRight}
              openInNewTab={openInNewTab}
              fileIds={fileIds} // 👈 must come from backend fetch
              setActiveFileId={setActiveFileId}
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
