import { forwardRef } from "react";
import "./RightNav.css";
const RightNav = forwardRef(function RightNav({ isOpen }, ref) {
  return (
    <div
      id="rightSidenav"
      ref={ref}
      className="sidenav right-sidenav"
      style={{ width: isOpen ? "180px" : "0px" }}
      aria-hidden={!isOpen}
    >
      <a href="#">Option 1</a>
      <a href="#">Option 2</a>
      <a href="#">Option 3</a>
    </div>
  );
});
export default RightNav;
