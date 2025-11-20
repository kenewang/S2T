import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import uploadIcon from "../../svg/icons8-upload-100.png";
import { jwtDecode } from "jwt-decode";

import "./FaqHeader.css";
const FaqHeader = ({
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

  const [isAllowed, setIsAllowed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!leftNavOpen) return;
    else {
      closeRightNav();
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const userRole = decoded.role;
      console.log("User role:", decoded.role);
      const validRoles = ["admin", "moderator", "educator"];
      if (!validRoles.includes(userRole)) return;
      setIsAllowed(true);
    }
  });

  return (
    <div className="faqHead-Wrapper">
      <span
        className="hamburger"
        onClick={openLeftNav}
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>

      {!isAllowed && <h2 className="heading-not-allowed">Share2Teach</h2>}

      {isAllowed && (
        <>
          <div className="faq-shortcuts">
            <p
              onClick={() => {
                navigate("/home/filemoderation");
              }}
            >
              File Moderation
            </p>

            <p
              className="faq-upload-icon"
              role="button"
              onClick={() => {
                navigate("/home/fileupload");
              }}
            >
              <span>Upload</span>
              <img src={uploadIcon} alt="Upload Icon" />
            </p>

            <p
              onClick={() => {
                navigate("/home/reports");
              }}
            >
              Reports
            </p>
          </div>

          <h2
            className="heading-allowed"
            onClick={() => {
              navigate("/home");
            }}
          >
            Share2Teach
          </h2>
        </>
      )}
    </div>
  );
};

export default FaqHeader;
