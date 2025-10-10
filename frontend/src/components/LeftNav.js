import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LeftNav.css";

const LeftNav = ({
  leftNavOpen,
  closeLeftNav,
  leftNavRef,
  isAuthenticated,
  setAuth,
}) => {
  const navigate = useNavigate();

  const goSomeWhere = (path) => {
    closeLeftNav();
    navigate(path);
  };

  useEffect(() => {
    if (!leftNavOpen) return;

    const handleOutsideClick = (event) => {
      const justOpened =
        performance.now() - leftNavRef.current?.dataset?.openedAt < 50;
      if (justOpened) return;

      const clickedInside = leftNavRef.current?.contains(event.target);
      if (!clickedInside) closeLeftNav();
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [leftNavOpen, closeLeftNav, leftNavRef]);

  // Add a marker when it opens so the effect can skip the first click
  if (leftNavOpen && leftNavRef.current) {
    leftNavRef.current.dataset.openedAt = performance.now();
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8081/auth/logout", {
        method: "POST",
        headers: {
          jwt_token: localStorage.getItem("token"),
        },
      });

      // Handle token expiration
      if (response.status === 403 || response.status === 401) {
        localStorage.removeItem("token");
        setAuth(false);
        navigate("/");
        return;
      }

      const parseRes = await response.json();

      if (response.ok) {
        localStorage.removeItem("token");
        setAuth(false);
        navigate("/");
      } else {
        alert(parseRes.msg || "Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err.message);
    }
  };

  return (
    <div
      id="mySidenav"
      ref={leftNavRef}
      className={`sidenav ${leftNavOpen ? "open" : ""}`}
    >
      {/* Show Home & Browse only if NOT authenticated */}
      {!isAuthenticated && (
        <>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/");
            }}
          >
            Home
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/browse");
            }}
          >
            Browse
          </a>
        </>
      )}

      {/* Show Log out only if authenticated */}
      {isAuthenticated && (
        <>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/home");
            }}
          >
            Home
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Add logout logic here
              handleLogout();
            }}
          >
            Log out
          </a>
        </>
      )}

      {/* Close button */}
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
    </div>
  );
};

export default LeftNav;
