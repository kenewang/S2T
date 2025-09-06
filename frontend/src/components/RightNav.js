import "./RightNav.css";
const RightNav = ({ isOpen, rightNavRef }) => {
  return (
    <div
      id="rightSidenav"
      ref={rightNavRef}
      className="sidenav right-sidenav"
      style={{ width: isOpen ? "130px" : "0px" }}
      aria-hidden={!isOpen}
    >
      <a href="#">Option 1</a>
      <a href="#">Option 2</a>
      <a href="#">Option 3</a>
    </div>
  );
};
export default RightNav;
