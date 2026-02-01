import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./FileUploadHeader.css";
const FileUploadHeader = ({
  leftNavOpen,
  openLeftNav,
  openSearch,
  rightNavOpen,
  closeRightNav,
}) => {
  const openSearchIcon = () => {
    if (!rightNavOpen && !leftNavOpen) {
      openSearch();
    } else {
      closeRightNav();
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!leftNavOpen) return;
    else {
      closeRightNav();
    }
  });

  return (
    <div className="file-upload-head">
      {" "}
      <span
        className="f-upload-hamburger"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>
      <div className="f-upload-shortcuts">
        <p
          onClick={() => {
            navigate("/home/filemoderation");
          }}
        >
          FILE MODERATION
        </p>
        <p
          onClick={() => {
            navigate("/faqs");
          }}
        >
          FAQS
        </p>

        <p
          onClick={() => {
            navigate("/home/reports");
          }}
        >
          REPORTS
        </p>
      </div>
      <h2
        onClick={() => {
          navigate("/home");
        }}
      >
        Share2Teach
      </h2>
    </div>
  );
};

export default FileUploadHeader;
