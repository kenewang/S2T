import { useState, useEffect } from "react";
import SubjectsHeader from "./SubjectsHeader";
import LeftNav from "../LeftNav";
import RightNav from "../RightNav";
import SearchOverlay from "../SearchOverlay";
import { useNavigate } from "react-router-dom";
import Results from "../Results";

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
  const [hideElements, setHideElements] = useState(false);
  const [value, setValue] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  const handleClick = (id) => {
    navigate(`/documents/${id}`); // go to the page with the id
  };

  useEffect(() => {
    document.title = "Share2Teach - Subjects";
    const fetchFileSubjectNames = async () => {
      try {
        const res = await fetch(`${API_URL}/subjects/names`);
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
            setHideElements={setHideElements}
            setValue={setValue}
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

          {!hideElements && (
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
          )}

          {hideElements && (
            <Results
              openRightNav={openRightNav}
              rightNavOpen={rightNavOpen}
              leftNavOpen={leftNavOpen}
              closeRightNav={closeRightNav}
              closeLeftNav={closeLeftNav}
              setActiveFileId={setActiveFileId}
              value={value}
            />
          )}
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

      {!hideElements && (
        <div className="subjectsFooter">
          <p>&copy; 2025 Share2Teach</p>
        </div>
      )}
    </div>
  );
};

export default Subjects;
