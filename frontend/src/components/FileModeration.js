import HeaderV2 from "./HeaderV2";
import "./FileModeration.css";
import LeftNav from "./LeftNav";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const [userRole, setUserRole] = useState("");

  const [moderationAction, setModerationAction] = useState(null); // 'approve' or 'reject'
  const [docToModerate, setDocToModerate] = useState(null);
  const navigate = useNavigate();
  const handleView = (path) => {
    window.open(path, "_blank");
  };

  const toggleModerationButtons = (fileId) => {
    setShowModerationButtons((prev) => (prev === fileId ? null : fileId));
  };

  const [showModerationButtons, setShowModerationButtons] = useState(null); // To toggle moderation buttons

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
      setDocToModerate(fileId);
      setModerationAction(action);
      await handleModerateDocument(); // 👉 call the moderation function
    }
  };

  const handleModerateDocument = async () => {
    try {
      setLoading(true);
      setLoadingMessage(
        `${
          moderationAction === "approved" ? "Approving" : "Rejecting"
        } document...`
      );

      const res = await fetch("http://localhost:8081/moderate-document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          jwt_token: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          file_id: docToModerate,
          action: moderationAction,
          comments: null,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc.id === docToModerate
              ? { ...doc, status: moderationAction }
              : doc
          )
        );

        Swal.fire({
          title: "Success!",
          text: `Document ${moderationAction} successfully.`,
          icon: "success",
          confirmButtonText: "OK",
        });
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
      console.error("Error moderating document:", err.message);
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

  useEffect(() => {
    document.title = "Share2Teach"; // Set the tab name to "Share2Teach"

    const fetchPendingDocuments = async () => {
      try {
        // Fetch only pending documents from /pending-documents
        const response = await fetch("http://localhost:8081/files/pending");

        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchPendingDocuments();
  }, []);

  return (
    <div className="file-moderation-container">
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

      <table className="documents-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Status</th>
            <th></th> {/* Column for action buttons */}
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.fileName}</td>
              <td>{doc.status}</td>
              <td>
                <div className="action-container">
                  <button
                    className="view-button"
                    onClick={() => handleView(doc.storagePath)}
                  >
                    View
                  </button>

                  <>
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
                  </>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileModeration;
