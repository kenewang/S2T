import { useEffect, useState } from "react";
import "./Results.css";
import file_icon from "../svg/icons8-file-100.png";
const Results = ({
  openRightNav,
  rightNavOpen,
  leftNavOpen,
  closeLeftNav,
  closeRightNav,
  setActiveFileId,
  value,
}) => {
  const [searchResults, setSearchResults] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  // Open the right panel for a specific file
  const openRight = (fileId) => {
    setActiveFileId(fileId);
    if (leftNavOpen) {
      closeLeftNav();
      openRightNav();
    } else {
      openRightNav();
    }
  };

  // Open a file in a new browser tab
  const openInNewTab = (url) => {
    if (!rightNavOpen && !leftNavOpen) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      closeRightNav();
      closeLeftNav();
    }
  };

  useEffect(() => {
    if (value) searchDocuments(value);
  }, [value]);

  // Fetch search results from the backend
  const searchDocuments = async (query) => {
    try {
      const res = await fetch(`${API_URL}/api/files/search?query=${query}`);

      if (!res.ok) {
        console.error("Search failed");
        return;
      }

      const data = await res.json();

      // Map results into a clean structure
      const results = data.map((file) => ({
        id: file.id,
        fileName: file.fileName,
        filePath: file.filePath,
        fileRating: file.fileRating,
        gradeName: file.gradeName, // extract grade name
      }));

      setSearchResults(results);
    } catch (err) {
      console.error("Error searching documents:", err);
    }
  };

  return (
    <div className="results-container">
      {searchResults.map((file) => (
        <div key={file.id} className="result-item">
          <div className="result-file-icon">
            <img
              src={file_icon}
              alt="file_icon"
              onClick={() => openInNewTab(file.filePath)}
            />
          </div>

          <div className="file-info">
            <p className="file-title">{file.fileName}</p>
            <p>Grade: {file.gradeName}</p>
            <p>{file.fileRating} Rating</p>
          </div>

          <div className="buttons">
            <button onClick={() => openRight(file.id)}>Options</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;
