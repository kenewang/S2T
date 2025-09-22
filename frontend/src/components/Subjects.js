import { useState, useEffect } from "react";
import Header from "./Header";
import LeftNav from "./LeftNav";
import SearchOverlay from "./SearchOverlay";

const Subjects = ({
  leftNavOpen,
  leftNavRef,
  openLeftNav,
  closeLeftNav,
  openSearch,
  searchActive,
  closeSearch,
  searchInputRef,
}) => {
  const [subjectNames, setSubjectNames] = useState([]);

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
    <div>
      {!searchActive && (
        <>
          <Header
            showSearchLogo={true}
            leftNavOpen={leftNavOpen}
            openLeftNav={openLeftNav}
            openSearch={openSearch}
            rightNavOpen={false}
            closeRightNav={() => {}}
          />

          <LeftNav
            leftNavOpen={leftNavOpen}
            closeLeftNav={closeLeftNav}
            leftNavRef={leftNavRef}
          />

          <section className="subjects">
            <h1 className="heading">Subjects</h1>
            <div className="subject_container">
              <ul>
                {subjectNames.map((item, i) => (
                  <li key={i}>
                    <a className="anchor" href="#">
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
      />

      <div className="subjectsFooter">
        <p>Contact</p>
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default Subjects;
