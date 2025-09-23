import Header from "./Header";
import LeftNav from "./LeftNav";
import SearchOverlay from "./SearchOverlay";
import RightNav from "./RightNav";
import DocumentList from "./DocumentList";
import "./SubjectDocuments.css";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

const SubjectDocuments = () => {
  const { id } = useParams();
  const [databaseNames, setDatabaseNames] = useState([]);
  const [storage_path_for_fileName, setStoragePath] = useState([]);
  const [file_rating_for_fileName, setFileRating] = useState([]);

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

  useEffect(() => {
    // This will run every time "id" changes
    if (id === "science") {
      console.log("First page logic runs here!");

      const fetchFileNames = async () => {
        try {
          const res = await fetch(`http://localhost:8081/files/${id}`);
          setDatabaseNames(await res.json());

          const res2 = await fetch(`http://localhost:8081/links/${id}`);
          setStoragePath(await res2.json());

          const res3 = await fetch(`http://localhost:8081/ratings/${id}`);
          setFileRating(await res3.json());
        } catch (error) {
          console.error("Error fetching names", error);
        }
      };
      fetchFileNames();

      // you can fetch data, call an API, etc.
    } else if (id === "second") {
      console.log("Second page logic runs here!");
    }
  }, [id]); // dependency: runs when id changes

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
              {id === "science" && (
                <DocumentList
                  openRightNav={openRightNav}
                  databaseNames={databaseNames}
                  storage_path={storage_path_for_fileName}
                  file_rating={file_rating_for_fileName}
                  rightNavOpen={rightNavOpen}
                  leftNavOpen={leftNavOpen}
                  closeLeftNav={closeLeftNav}
                  closeRightNav={closeRightNav}
                />
              )}
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
