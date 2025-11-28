import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FileUploadHeader from "./FileUploadHeader";
import LeftNav from "../LeftNav";
import Swal from "sweetalert2";

import "./FileUpload.css";

import { jwtDecode } from "jwt-decode";

const FileUpload = ({
  leftNavOpen,
  openLeftNav,
  openSearch,
  rightNavOpen,
  closeRightNav,
  isAuthenticated,
  setAuth,
  onRatingSubmitted,
  closeLeftNav,
  leftNavRef,
}) => {
  const [fileName, setFileName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [keywords, setKeywords] = useState("");
  const [file, setFile] = useState(null);
  const [subjectsList, setSubjectsList] = useState([]);
  const [gradesList, setGradesList] = useState([]);
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal visibility state
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(0);

  const handleRefresh = () => {
    setRefresh((prev) => prev + 1);
  };
  // Fetch subjects and grades from API on component mount
  useEffect(() => {
    document.title = "Share2Teach"; // Set the tab name to "Share2Teach"
    const fetchSubjectsAndGrades = async () => {
      try {
        const [subjectsRes, gradesRes] = await Promise.all([
          fetch("http://localhost:8081/subjects"),
          fetch("http://localhost:8081/grades"),
        ]);
        setSubjectsList(await subjectsRes.json());
        setGradesList(await gradesRes.json());
      } catch (error) {
        console.error("Error fetching subjects/grades:", error);
      }
    };

    fetchSubjectsAndGrades();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const decoded = jwtDecode(token);
      const userRole = decoded.role;
      const validRoles = ["admin", "moderator", "educator"];

      if (!validRoles.includes(userRole)) {
        navigate("/home");
        console.log("navigated!");
      }
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  // Handle file upload form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("subject", subject);
    formData.append("grade", grade);
    formData.append("keywords", keywords);
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8081/documents/upload", {
        method: "POST",
        headers: { jwt_token: localStorage.getItem("token") },
        body: formData,
      });

      /*  setMessage("File uploaded successfully!");
      setShowSuccessModal(true);  */

      if (!res.ok) {
        const err = await res.text();
        console.error("Upload error:", err);
        Swal.fire("Error", "Failed to upload file", "error");
        return;
      }

      Swal.fire({
        title: "Success!",
        text: "File Uploaded  successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
      handleRefresh();
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file!");
    }
  };

  // Handle "OK" button in the success modal
  /*  const handleModalClose = () => {
    setShowSuccessModal(false);
  }; */

  return (
    <div className="file-upload-container">
      {/* Add a link to the FAQ page in the top right */}
      <FileUploadHeader
        showSearchLogo={false}
        showUploadIcon={false}
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

      <h2 className="upload_heading">Upload A Document</h2>

      <form
        className="upload-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <input
            className="file-input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        <div>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select Subject</option>
            {subjectsList.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.subjectName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            required
          >
            <option value="">Select Grade</option>
            {gradesList.map((gr) => (
              <option key={gr.gradeId} value={gr.gradeId}>
                {gr.gradeName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Keywords:</label>
          <input
            type="text"
            className="keyword-input"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Separate with commas"
            required
          />
        </div>

        <button className="upload-button" type="submit">
          Submit
        </button>
      </form>

      {/* Success Modal */}
      {/*   {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p className="upload-paragraph">{message}</p>
            <button onClick={handleModalClose}>OK</button>
          </div>
        </div>
      )} */}
      <div className="uploadFooter">
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default FileUpload;
