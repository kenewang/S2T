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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL;

  /* Prevent user from uploading large files early */
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    const maxSize = 10 * 1024 * 1024; // 10MB

    if (selectedFile.size > maxSize) {
      Swal.fire({
        title: "Error",
        text: "File is too large! Maximum allowed size is 10MB.",
        icon: "error",
        customClass: {
          popup: "upload-popup-error",
          title: "upload-popup-error-title",
          icon: "upload-popup-error-icon",
        },
      });

      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  // Fetch subjects and grades from API on component mount
  useEffect(() => {
    document.title = "Share2Teach";

    const fetchSubjectsAndGrades = async () => {
      try {
        const [subjectsRes, gradesRes] = await Promise.all([
          fetch(`${API_URL}/api/subjects`, {
            method: "GET",
          }),
          fetch(`${API_URL}/api/grades`, {
            method: "GET",
          }),
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
    document.title = "Share2Teach - File Upload";
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
  }, []);

  // Handle file upload form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true);
    setUploadProgress(0);
    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("subject", subject);
    formData.append("grade", grade);
    formData.append("keywords", keywords);
    formData.append("file", file);

    try {
      // Simulated progress bar animation
      const fakeProgress = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(fakeProgress);
            return 90;
          }
          return prev + 5;
        });
      }, 100);

      // Perform upload request
      const res = await fetch(`${API_URL}/api/documents/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      clearInterval(fakeProgress);

      // Finish progress bar
      setUploadProgress(100);

      if (!res.ok) {
        setIsUploading(false);
        const err = await res.text();
        console.error("Upload error:", err);
        Swal.fire({
          title: "Error",
          text: "Failed to Upload Document",
          icon: "error",
          customClass: {
            popup: "upload-popup-error",
            title: "upload-popup-error-title",
            icon: "upload-popup-error-icon",
          },
        }).then(() => {
          window.location.reload();
        });
        return;
      }

      setIsUploading(false);
      setUploadProgress(0);

      Swal.fire({
        title: "Success!",
        text: "File Uploaded Successfully.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "upload-popup-success",
          title: "upload-popup-success-title",
          icon: "upload-popup-warning-icon",
        },
      }).then(() => {
        // Hide progress bar

        // Allow UI to update before reload
        setTimeout(() => {
          window.location.reload();
        }, 100); // 300ms works perfectly
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
    }
  };

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
            onChange={handleFileChange}
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
          Upload
        </button>
      </form>

      {isUploading && (
        <div className="upload-overlay">
          <div className="progress-container">
            <h3>Uploading...</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p>{uploadProgress}%</p>
          </div>
        </div>
      )}

      <div className="uploadFooter">
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default FileUpload;
