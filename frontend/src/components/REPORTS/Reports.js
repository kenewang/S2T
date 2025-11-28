import ReportsHeader from "./ReportsHeader";
import "./Reports.css";
import LeftNav from "../LeftNav";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

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
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  const handleView = async (fileId) => {
    try {
      const response = await fetch(`http://localhost:8081/file-path/${fileId}`);

      if (!response.ok) {
        alert("Failed to retrieve file path");
        return;
      }

      const data = await response.json();
      const storagePath = data.storage_path;

      // Open the file in a new tab
      window.open(storagePath, "_blank");
    } catch (err) {
      console.error("Error fetching file path:", err.message);
      alert("Error fetching file path");
    }
  };

  const submitModeration = async (reportId, action) => {
    try {
      const res = await fetch("http://localhost:8081/reports/moderate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportId,
          action,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          title: "Success!",
          text: `${action} successfully.`,
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            popup: "resolve-popup-success",
            title: "resolve-popup-success-title",
            icon: "resolve-popup-warning-icon",
          },
        });
        handleRefresh();
      } else {
        Swal.fire({
          title: "Error",
          text: data.msg || "Failed to moderate document",
          icon: "error",
          customClass: {
            popup: "moderatePopUpError",
            title: "moderatePopUpError-title",
            icon: "moderatePopUp-error-icon",
          },
        });
      }
    } catch (err) {
      console.error("Error moderating document:", err);

      Swal.fire({
        title: "Error",
        text: "Error moderating document",
        icon: "error",
        customClass: {
          popup: "moderatePopUpError",
          title: "moderatePopUpError-title",
          icon: "moderatePopUp-error-icon",
        },
      });
    }
  };

  const handleModerateReport = async (fileId, action) => {
    const readableAction = action === "Resolved" ? "Resolve" : "Reject";

    const result = await Swal.fire({
      title: `${readableAction} Document`,
      text: `Are you sure you want to ${readableAction.toLowerCase()} this document?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
      allowOutsideClick: false,
      allowEscapeKey: false,

      customClass: {
        popup: "moderatePopUp",
        title: "moderatePopUp-title",
        icon: "moderatePopUp-warning-icon",
      },
    });

    if (result.isConfirmed) {
      await submitModeration(fileId, action);
    }
  };

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
  }, [refresh]);

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
                      onClick={() => handleView(report.fileId)}
                    >
                      View
                    </button>
                    <>
                      <button
                        className="r-approve-button"
                        onClick={() =>
                          handleModerateReport(report.reportId, "Resolved")
                        }
                      >
                        Resolve
                      </button>
                      <button
                        className="r-reject-button"
                        onClick={() =>
                          handleModerateReport(report.reportId, "Rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
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
