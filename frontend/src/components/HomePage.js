import Header from "./Header";
import LeftNav from "./LeftNav";
import SearchOverlay from "./SearchOverlay";

import RightNav from "./RightNav";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ScienceDocuments from "./ScienceDocuments";
import MathematicsDocuments from "./MathematicsDocuments";
import ProgrammingDocuments from "./ProgrammingDocuments";
import useFetchFiles from "../hooks/useFetchFiles";
import NotFound from "./NotFound";

const HomePage = ({
  leftNavRef, //passed down from App.js
  rightNavRef, //passed down from App.js

  isAuthenticated,
  setAuth,

  activeFileId,
  setActiveFileId,
}) => {
  const [ratingTrigger, setRatingTrigger] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const scienceData = useFetchFiles("science", ratingTrigger, setNotFound);

  const mathData = useFetchFiles("mathematics", ratingTrigger, setNotFound);

  const programmingData = useFetchFiles(
    "computer programming",
    ratingTrigger,
    setNotFound
  );

  const [leftNavOpen, setLeftNavOpen] = useState(false);
  const [rightNavOpen, setRightNavOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const searchInputRef = useRef(null);

  const openLeftNav = () => setLeftNavOpen(true);
  const closeLeftNav = () => setLeftNavOpen(false);

  const openRightNav = () => setRightNavOpen(true);
  const closeRightNav = () => setRightNavOpen(false);

  const openSearch = () => setSearchActive(true);
  const closeSearch = () => setSearchActive(false);

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

  const handleRatingSubmitted = () => {
    setRatingTrigger((prev) => prev + 1);
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
              onRatingSubmitted={handleRatingSubmitted}
            />

            <RightNav
              rightNavRef={rightNavRef}
              closeRightNav={closeRightNav}
              rightNavOpen={rightNavOpen}
              activeFileId={activeFileId}
              onRatingSubmitted={handleRatingSubmitted} // <-- pass callback
              isAuthenticated={isAuthenticated}
            />

            {scienceData.loading ? (
              <p>Loading Science files...</p>
            ) : (
              <ScienceDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={scienceData.databaseNames}
                storage_path={scienceData.storagePath}
                file_rating={scienceData.fileRating}
                fileIds={scienceData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {mathData.loading ? (
              <p>Loading Math files...</p>
            ) : (
              <MathematicsDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={mathData.databaseNames}
                storage_path={mathData.storagePath}
                file_rating={mathData.fileRating}
                fileIds={mathData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {programmingData.loading ? (
              <p>Loading Programming files...</p>
            ) : (
              <ProgrammingDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={programmingData.databaseNames}
                storage_path={programmingData.storagePath}
                file_rating={programmingData.fileRating}
                fileIds={programmingData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
          </>
        )}

        {notFound && (
          <>
            <NotFound />
          </>
        )}

        <SearchOverlay
          searchActive={searchActive}
          closeSearch={closeSearch}
          searchInputRef={searchInputRef}
          openRightNav={openRightNav}
          rightNavOpen={rightNavOpen}
          leftNavOpen={leftNavOpen}
          closeRightNav={closeRightNav}
          closeLeftNav={closeLeftNav}
          setActiveFileId={setActiveFileId}
          rightNavRef={rightNavRef}
          onRatingSubmitted={handleRatingSubmitted} // <-- pass callback
          ratingTrigger={ratingTrigger}
          activeFileId={activeFileId}
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
