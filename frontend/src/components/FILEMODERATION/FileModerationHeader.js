import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import uploadIcon from "../../svg/icons8-upload-100.png";
import "./FileModerationHeader.css";
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

        <p
          onClick={() => {
            navigate("/home/reports");
          }}
        >
          Reports
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
