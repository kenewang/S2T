import menu_icon from "../svg/iconmonstr-menu-dot-vertical-filled.svg";
const DocumentList = ({ openRightNav }) => {
  return (
    <section className="document-container">
      {[1, 2, 3, 4].map((_, i) => (
        <div className="document" key={i}>
          <p>Bulma</p>
          <div onClick={openRightNav} role="button" aria-label="Open options">
            <img src={menu_icon} alt="Options" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default DocumentList;
