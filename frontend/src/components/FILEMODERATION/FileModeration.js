import FileModerationHeader from "./FileModerationHeader";
import "./FileModeration.css";
import LeftNav from "../LeftNav";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FileModeration = ({
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
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };

  /** -------------------------------
   *   MAIN MODERATION HANDLER
   *   (NO state dependency)
   * --------------------------------
   */
  const handleModerationAction = async (fileId, action) => {
    const readableAction = action === "approved" ? "Approve" : "Reject";

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

  /** ----------------------------------------
   *     SEND MODERATION REQUEST
   *     (fileId + action passed directly)
   * -----------------------------------------
   */
  const submitModeration = async (fileId, action) => {
    try {
      const res = await fetch("http://localhost:8081/moderation/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          id: fileId,
          action: action,
          comments: null,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // Update local UI
        setDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc.id === fileId ? { ...doc, status: action } : doc
          )
        );

        Swal.fire({
          title: "Success!",
          text: "Document Approved Successfully.",
          icon: "success",
          confirmButtonText: "OK",
          customClass: {
            popup: "moderatePopUp",
            title: "moderatePopUp-title",
            icon: "moderatePopUp-warning-icon",
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

  /** -------------------------------
   *   LOAD ONLY PENDING FILES
   * --------------------------------
   */
  useEffect(() => {
    document.title = "Share2Teach";

    const fetchPendingDocuments = async () => {
      try {
        const response = await fetch("http://localhost:8081/files/pending");
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchPendingDocuments();
  }, [refresh]);

  return (
    <div className="file-moderation-container">
      <FileModerationHeader
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

      <table className="documents-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {documents.length > 0 ? (
            documents.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.fileName}</td>
                <td>{doc.status}</td>

                <td>
                  <div className="action-container">
                    <button
                      className="view-button"
                      onClick={() => window.open(doc.storagePath, "_blank")}
                    >
                      View
                    </button>

                    <button
                      className="approve-button"
                      onClick={() => handleModerationAction(doc.id, "approved")}
                    >
                      Approve
                    </button>

                    <button
                      className="reject-button"
                      onClick={() => handleModerationAction(doc.id, "rejected")}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="no-p-files">No Files files to Moderate</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="moderationFooter">
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default FileModeration;
