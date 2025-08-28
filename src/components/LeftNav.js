import "./LeftNav.css";
const LeftNav = ({ isOpen, closeLeftNav }) => {
  return (
    <div
      id="mySidenav"
      className={`sidenav ${isOpen ? "open" : ""}`} // toggle style.css class
      //If isOpen is true → the class will be ".sidenav.open" inside style.css.
      //If isOpen is false → the class will just be ".sidenav" inside style.css.
      //The CSS handles the actual width change.
    >
      <a
        href="#"
        className="closebtn"
        onClick={(e) => {
          e.preventDefault();
          closeLeftNav();
        }}
      >
        ×
      </a>
      <a href="#">Home</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
  );
};

export default LeftNav;
