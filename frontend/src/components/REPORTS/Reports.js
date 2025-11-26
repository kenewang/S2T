import ReportsHeader from "./ReportsHeader";
import "./Reports.css";
import LeftNav from "../LeftNav";
import { useState, useEffect } from "react";

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
  const [reports, setReports] = useState([]);
  const [showModerationButtons, setShowModerationButtons] = useState(null); // Track which report shows moderation buttons

  useEffect(() => {
    document.title = "Share2Teach"; // Set the tab name to "Share2Teach"
    const fetchReports = async () => {
      try {
        let response;

        response = await fetch("http://localhost:8081/reports/pending");

        if (!response.ok) {
          console.error("Server returned:", response.status);
          return;
        }
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  const toggleModerationButtons = (report_id) => {
    setShowModerationButtons((prev) => (prev === report_id ? null : report_id));
  };

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

      <table className="reports-table">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>fileId ID</th>
            <th>Reason</th>
            <th>Reporter</th>
            <th>Status</th>
            <th>Report Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.reportId}>
                <td>{report.reportId}</td>
                <td>{report.fileId}</td>
                <td>{report.reason}</td>
                <td>
                  {report.reporterFname} {report.reporterLname}
                </td>
                <td>{report.status}</td>
                <td>{new Date(report.createdAt).toLocaleString()}</td>
                <td>
                  <div className="action-container">
                    <button
                      className="view-button"
                      /* onClick={() => handleView(report.fileId)} */
                    >
                      View fileId
                    </button>
                    <span
                      className="three-dots"
                      onClick={() => toggleModerationButtons(report.reportId)}
                    >
                      &#x22EE;
                    </span>
                    {showModerationButtons === report.reportId && (
                      <>
                        <button
                          className="approve-button"
                          style={{ backgroundColor: "green", color: "white" }} // Resolve button style
                          /* onClick={() =>
                            handleModerateReport(report.reportId, "resolved")
                          } */
                        >
                          Resolve
                        </button>
                        <button
                          className="reject-button"
                          style={{ backgroundColor: "red", color: "white" }} // Reject button style
                          /* onClick={() =>
                            handleModerateReport(report.reportId, "rejected")
                          } */
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-reports">
                No pending reports
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="reportsFooter">
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default Reports;
