import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import LeftNav from "./LeftNav";
import axios from "axios";
import "./FileUpload.css";

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
  const [file_name, setFileName] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [keywords, setKeywords] = useState("");
  const [file, setFile] = useState(null);
  const [subjectsList, setSubjectsList] = useState([]);
  const [gradesList, setGradesList] = useState([]);
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal visibility state
  const [message, setMessage] = useState("");

  // Fetch subjects and grades from API on component mount
  /*   useEffect(() => {
    document.title = "Share2Teach"; // Set the tab name to "Share2Teach"
    const fetchSubjectsAndGrades = async () => {
      try {
        const [subjectsRes, gradesRes] = await Promise.all([
          axios.get("http://localhost:3000/subjects"),
          axios.get("http://localhost:3000/grades"),
        ]);
        setSubjectsList(subjectsRes.data);
        setGradesList(gradesRes.data);
      } catch (error) {
        console.error("Error fetching subjects/grades:", error);
      }
    };

    fetchSubjectsAndGrades();
  }, []) */ // Handle file upload form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file_name", file_name);
    formData.append("subject", subject);
    formData.append("grade", grade);
    formData.append("keywords", keywords);
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/documents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            jwt_token: token, // Include the JWT token here
          },
        }
      );
      setMessage("File uploaded successfully!");
      setShowSuccessModal(true); // Show success modal
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file!");
    }
  };

  // Handle "OK" button in the success modal
  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate("/documents"); // Redirect to DocumentsView
  };

  return (
    <div className="file-upload-container">
      {/* Add a link to the FAQ page in the top right */}
      <Header
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
              <option key={sub.subject_id} value={sub.subject_id}>
                {sub.subject_name}
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
              <option key={gr.grade_id} value={gr.grade_id}>
                {gr.grade_name}
              </option>
            ))}
          </select>
        </div>

        <button className="upload-button" type="submit">
          Submit
        </button>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p className="upload-paragraph">{message}</p>
            <button onClick={handleModalClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
