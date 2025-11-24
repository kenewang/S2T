import ReportsHeader from "./ReportsHeader";
import "./Reports.css";
import LeftNav from "../LeftNav";

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
      <ReportsHeader
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
      <div className="reportsFooter">
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default Reports;
