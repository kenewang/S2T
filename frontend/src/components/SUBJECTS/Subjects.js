import { useState, useEffect } from "react";
import SubjectsHeader from "./SubjectsHeader";
import LeftNav from "../LeftNav";
import RightNav from "../RightNav";
import SearchOverlay from "../SearchOverlay";
import { useNavigate } from "react-router-dom";

const Subjects = ({
  leftNavOpen,
  leftNavRef,
  openLeftNav,
  closeLeftNav,
  openSearch,
  searchActive,
  closeSearch,
  searchInputRef,
  openRightNav,
  rightNavOpen,
  closeRightNav,
  setActiveFileId,
  rightNavRef,
  onRatingSubmitted,
  ratingTrigger,
  activeFileId,
  isAuthenticated,
  showSearchLogo,
}) => {
  const navigate = useNavigate();
  const [subjectNames, setSubjectNames] = useState([]);
  const handleClick = (id) => {
    navigate(`/documents/${id}`); // go to the page with the id
  };

  useEffect(() => {
    const fetchFileSubjectNames = async () => {
      try {
        const res = await fetch("http://localhost:8081/subjects/names");
        setSubjectNames(await res.json());
      } catch (error) {
        console.error("Error fetching subjects", error);
      }
    };
    fetchFileSubjectNames();
  }, []);

  return (
    <div className="subWrapper">
      {!searchActive && (
        <>
          <SubjectsHeader
            leftNavOpen={leftNavOpen}
            openLeftNav={openLeftNav}
            openSearch={openSearch}
            rightNavOpen={false}
            closeRightNav={() => {}}
            showSearchLogo={showSearchLogo}
          />

          <LeftNav
            leftNavOpen={leftNavOpen}
            closeLeftNav={closeLeftNav}
            leftNavRef={leftNavRef}
          />

          <RightNav
            rightNavOpen={rightNavOpen}
            rightNavRef={rightNavRef}
            closeRightNav={closeRightNav}
            leftNavOpen={leftNavOpen}
            closeLeftNav={closeLeftNav}
            openRightNav={openRightNav}
            activeFileId={activeFileId}
            onRatingSubmitted={onRatingSubmitted}
            isAuthenticated={isAuthenticated}
          />

          <section className="subjects">
            <h1 className="heading">Subjects</h1>
            <div className="subject_container">
              <ul>
                {subjectNames.map((item, i) => (
                  <li key={i}>
                    <a
                      className="anchor"
                      onClick={() => {
                        handleClick(item.toLowerCase());
                      }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
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
        onRatingSubmitted={onRatingSubmitted} // <-- pass callback
        ratingTrigger={ratingTrigger}
        activeFileId={activeFileId}
      />

      <div className="subjectsFooter">
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default Subjects;
