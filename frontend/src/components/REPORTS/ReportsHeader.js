import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadIcon from "../../svg/icons8-upload-100.png";
import "./ReportsHeader.css";
const HeaderV2 = ({
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
    <div className="reports-head">
      {" "}
      <span
        className="reports-hamburger"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>
      <div className="reports-shortcuts">
        <p
          onClick={() => {
            navigate("/home/filemoderation");
          }}
        >
          File Moderation
        </p>

        <p
          className="reports-upload-icon"
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
            navigate("/faqs");
          }}
        >
          FAQs
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

export default HeaderV2;
