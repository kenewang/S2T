import menu_icon from "../svg/iconmonstr-menu-dot-vertical-filled.svg";
import file_icon from "../svg/icons8-file-100.png";
import "./DocumentList.css";

const DocumentList = ({
  openRightNav,
  databaseNames,
  storage_path,
  file_rating,
  rightNavOpen,
  leftNavOpen,
  closeLeftNav,
  closeRightNav,
  setActiveFileId, // 👈 added prop
  fileIds, // 👈 add this array of file IDs fetched from backend
}) => {
  const OpenRight = (fileId) => {
    setActiveFileId(fileId); // 👈 store the file being rated
    if (leftNavOpen) {
      closeLeftNav();
      openRightNav();
    } else openRightNav();
  };

  const openInNewTab = (url) => {
    if (!rightNavOpen && !leftNavOpen) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      closeRightNav();
      closeLeftNav();
    }
  };

  return (
    <section className="document-container">
      {databaseNames.map((item, i) => {
        const extIndex = item.lastIndexOf(".");
        const name = extIndex === -1 ? item : item.slice(0, extIndex);
        const ext = extIndex === -1 ? "" : item.slice(extIndex);

        const link = storage_path[i];
        const rating = file_rating[i];
        const fileId = fileIds[i]; // 👈 match each name/link/rating with its ID

        return (
          <div className="document" key={i}>
            <img
              className="file_icon"
              src={file_icon}
              alt="file_icon"
              onClick={() => openInNewTab(link)}
            />

            <p className="rating">
              <span className="rating_span">{rating}</span> Rating
            </p>

            {/* Three-dot menu */}
            <img
              className="three_dot"
              src={menu_icon}
              alt="Options"
              onClick={() => OpenRight(fileId)} // 👈 pass fileId
            />

            {/* File name */}
            <p className="truncate-middle" onClick={() => openInNewTab(link)}>
              <span className="start">{name}</span>
              <span className="end">{ext}</span>
            </p>
          </div>
        );
      })}
    </section>
  );
};

export default DocumentList;
