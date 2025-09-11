import menu_icon from "../svg/iconmonstr-menu-dot-vertical-filled.svg";
import file_icon from "../svg/icons8-file-100.png";
import "./DocumentList.css";

const DocumentList = ({
  openRightNav, //we need this prop to be able to open the right nav when clicking the three dot menu
  databaseNames, //this prop is for an array of file names we get from the database
  storage_path, //this one's for an array of actual file links from the database
  isRightNavOpen, //this prop is whether right nav is opened or not
  isLeftNavOpen,
  closeLeftNav,
  closeRightNav, //this prop is a function ref and we use it to close the right nav
}) => {
  const OpenLeft = () => {
    if (isLeftNavOpen) {
      closeLeftNav();
      openRightNav();
    } else openRightNav();
  };

  const openInNewTab = (url) => {
    if (!isRightNavOpen && !isLeftNavOpen) {
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

        // pick a storage_path for this file
        const link = storage_path[i];

        return (
          <div className="document" key={i}>
            <img
              className="file_icon"
              src={file_icon}
              alt="file_icon"
              onClick={() => openInNewTab(link)} //use an arrow function to avoid calling the function immediately since this function takes an argument.
            />
            {/* Three-dot menu */}
            <img
              className="three_dot"
              src={menu_icon}
              alt="Options"
              onClick={OpenLeft}
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
