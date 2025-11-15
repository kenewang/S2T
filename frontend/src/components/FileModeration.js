import HeaderV2 from "./HeaderV2";
import "./FileModeration.css";
import LeftNav from "./LeftNav";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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

  const [showModerationDialog, setShowModerationDialog] = useState(false);
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

  const handleModerationAction = (fileId, action) => {
    setDocToModerate(fileId);
    setModerationAction(action);
    setShowModerationDialog(true);
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
          comments: null, // Optional comments can be added if required
        }),
      });

      const data = await res.json();
      setLoading(false);
      setShowModerationDialog(false);

      if (res.ok) {
        setDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc.file_id === docToModerate
              ? { ...doc, status: moderationAction }
              : doc
          )
        );
        alert(`Document ${moderationAction} successfully!`);
      } else {
        alert(data.msg || "Failed to moderate document");
      }
    } catch (err) {
      console.error("Error moderating document:", err.message);
      setLoading(false);
      alert("Error moderating document");
    }
  };

  useEffect(() => {
    document.title = "Share2Teach"; // Set the tab name to "Share2Teach"

    const fetchPendingDocuments = async () => {
      try {
        const token = localStorage.getItem("token");
        let response;

        // Fetch only pending documents from /pending-documents
        response = await fetch("http://localhost:8081/files/pending");

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
                    onClick={() => handleView(doc.storage_path)}
                  >
                    View
                  </button>
                  <span
                    className="three-dots"
                    onClick={() => toggleModerationButtons(doc.file_id)}
                  >
                    &#x22EE;
                  </span>
                  {showModerationButtons === doc.file_id && (
                    <>
                      <button
                        className="approve-button"
                        onClick={() =>
                          handleModerationAction(doc.file_id, "approved")
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="reject-button"
                        onClick={() =>
                          handleModerationAction(doc.file_id, "rejected")
                        }
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show confirmation dialog for moderation */}
      {showModerationDialog && (
        <div className="confirm-moderation-dialog">
          <div className="confirm-moderation-content">
            <p>Are you sure you want to {moderationAction} this document?</p>
            <button onClick={handleModerateDocument}>Yes</button>
            <button onClick={() => setShowModerationDialog(false)}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileModeration;
