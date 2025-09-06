import "./LeftNav.css";
const LeftNav = ({ isOpen, closeLeftNav, leftNavRef }) => {
  return (
    <div
      id="mySidenav"
      ref={leftNavRef} //we now have a remote to the LeftNav object in the DOM
      className={`sidenav ${isOpen ? "open" : ""}`} // goes into LeftNav.css file
      //If isOpen is true → the class will be ".sidenav.open" inside LeftNav.css.
      //If isOpen is false → the class will just be ".sidenav" inside style.css.
      //The CSS handles the actual width change.
    >
      <a
        href="#"
        className="closebtn"
        onClick={(e) => {
          //an event object is created and passed inside the anonymous function and "e" references it
          e.preventDefault(); //we use that e to get the event object's "preventDefault()" method
          //the preventDefault() stops the browser's default action like when going somewhere after clicking a link
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
