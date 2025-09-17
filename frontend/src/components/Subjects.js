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
  return (
    <div>
      {!isActive && (
        <>
          <Header
            showSearchLogo={true} // show the search icon
            isLeftNavOpen={isOpen}
            openLeftNav={openLeftNav}
            // Pass other props if you need search/right nav to work:
            openSearch={openSearch}
            isRightNavOpen={false}
            closeRightNav={() => {}}
          />

          <LeftNav
            isOpen={isOpen}
            closeLeftNav={closeLeftNav}
            leftNavRef={leftNavRef}
          />

          <section>
            <h1>Subjects</h1>
            <div className="subject_container">
              <ul>
                <li>
                  <a href="#">Mathematics</a>
                </li>
              </ul>
            </div>
          </section>
        </>
      )}

      <SearchOverlay
        isActive={isActive} // ✅ fixed
        onBack={onBack}
        inputRef={inputRef}
      />

      <div>
        <p>Contact</p>
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default Subjects;
