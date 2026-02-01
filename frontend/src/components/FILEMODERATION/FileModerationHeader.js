import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadIcon from "../../svg/icons8-upload-100.png";
import "./FileModerationHeader.css";
const FileModerationHeader = ({
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
    <div className="file-moderation-head">
      {" "}
      <span
        className="f-moderation-hamburger"
        onClick={openLeftNav} //call the function "openLeftNav" when the hamburger menu is clicked
        aria-label="Open menu"
        role="button"
      >
        ☰
      </span>
      <div className="f-moderation-shortcuts">
        <p
          className="faq-upload-icon"
          role="button"
          onClick={() => {
            navigate("/home/fileupload");
          }}
        >
          UPLOAD
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

export default FileModerationHeader;
