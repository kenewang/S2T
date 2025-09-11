import { useEffect } from "react";
import "./RightNav.css";
const RightNav = ({ isOpen, closeRightNav, rightNavRef }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event) => {
      const justOpened =
        performance.now() - rightNavRef.current?.dataset?.openedAt < 50;
      if (justOpened) return;

      const clickedInside = rightNavRef.current?.contains(event.target);
      const clickedMenuImage = event.target?.closest?.("img");

      if (!clickedInside && !clickedMenuImage) closeRightNav();
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen, closeRightNav, rightNavRef]);

  if (isOpen && rightNavRef.current) {
    rightNavRef.current.dataset.openedAt = performance.now();
  }

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
