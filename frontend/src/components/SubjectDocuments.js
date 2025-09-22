import Header from "./Header";
import LeftNav from "./LeftNav";
import SearchOverlay from "./SearchOverlay";
import RightNav from "./RightNav";
import DocumentList from "./DocumentList";
import "./SubjectDocuments.css";
import { useState, useRef } from "react";

const SubjectDocuments = ({ databaseNames, storage_path, file_rating }) => {
  const [leftNavOpen, setLeftNavOpen] = useState(false);
  const [rightNavOpen, setRightNavOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const searchInputRef = useRef(null);
  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);

  const openSearch = () => setSearchActive(true);
  const closeSearch = () => setSearchActive(false);

  const openLeftNav = () => setLeftNavOpen(true);
  const closeLeftNav = () => setLeftNavOpen(false);

  const openRightNav = () => setRightNavOpen(true);
  const closeRightNav = () => setRightNavOpen(false);

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

  return (
    <div>
      <section className="container">
        {!searchActive && (
          <>
            <Header
              showSearchLogo={true}
              leftNavOpen={leftNavOpen}
              rightNavOpen={rightNavOpen}
              openLeftNav={openLeftNav}
              openSearch={openSearch}
              openRightNav={openRightNav}
              closeRightNav={closeRightNav}
            />

            <LeftNav
              leftNavOpen={leftNavOpen}
              closeLeftNav={closeLeftNav}
              leftNavRef={leftNavRef}
            />

            <RightNav
              rightNavRef={rightNavRef}
              closeRightNav={closeRightNav}
              rightNavOpen={rightNavOpen}
            />
            <main className="main-content">
              <DocumentList
                openRightNav={openRightNav}
                databaseNames={databaseNames}
                storage_path={storage_path}
                file_rating={file_rating}
                rightNavOpen={rightNavOpen}
                leftNavOpen={leftNavOpen}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
              />
            </main>
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
export default SubjectDocuments;
