import { useState, useEffect } from "react";
import Header from "./Header";
import LeftNav from "./LeftNav";
import SearchOverlay from "./SearchOverlay";

const Subjects = ({
  isOpen,
  leftNavRef,
  openLeftNav,
  closeLeftNav,
  openSearch,
  isActive,
  onBack,
  inputRef,
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
      {!isActive && (
        <>
          <Header
            showSearchLogo={true}
            isLeftNavOpen={isOpen}
            openLeftNav={openLeftNav}
            openSearch={openSearch}
            isRightNavOpen={false}
            closeRightNav={() => {}}
          />

          <LeftNav
            isOpen={isOpen}
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

      <SearchOverlay isActive={isActive} onBack={onBack} inputRef={inputRef} />

      <div>
        <p>Contact</p>
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default Subjects;
