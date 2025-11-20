import HeaderV2 from "./HeaderV2";
import "./FileModeration.css";
import LeftNav from "./LeftNav";

const Reports = ({
  openLeftNav,
  openSearch,
  rightNavOpen,
  closeRightNav,
  leftNavOpen,
  isAuthenticated,
  setAuth,
  onRatingSubmitted,
  closeLeftNav,
  leftNavRef,
}) => {
  return (
    <div className="reports-container">
      <HeaderV2
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
        onRatingSubmitted={onRatingSubmitted}
      />
    </div>
  );
};

export default Reports;
