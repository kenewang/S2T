import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LeftNav.css";
import { jwtDecode } from "jwt-decode";

const LeftNav = ({
  leftNavOpen,
  closeLeftNav,
  leftNavRef,
  isAuthenticated,
  setAuth,
  onRatingSubmitted,
}) => {
  const navigate = useNavigate();
  const [allowedRole, setAllowedRole] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const goSomeWhere = (path) => {
    closeLeftNav();
    if (typeof onRatingSubmitted === "function") {
      onRatingSubmitted();
      //this is just to refresh the parent (App.js) when we navigate to it
    }
    navigate(path);
  };

  const blockBackNavigation = () => {
    // Push a state so the current page becomes the "first" in history
    window.history.pushState(null, "", window.location.href);

    // Define the handler function separately (so we can remove it later)
    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    // Listen for the back button
    window.addEventListener("popstate", handlePopState);

    // 🧹 Auto-cleanup listener when the user leaves or reloads
    window.addEventListener("beforeunload", () => {
      window.removeEventListener("popstate", handlePopState);
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const userRole = decoded.role;

      const validRoles = ["admin", "moderator", "educator"];
      if (!validRoles.includes(userRole)) return;
      setAllowedRole(true);
    }
  }, []);

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
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          credentials: "include", // Important for cookies/sessions
        },
      });

      // Handle token expiration
      if (response.status === 403 || response.status === 401) {
        localStorage.removeItem("token");
        setAuth(false);
        navigate("/");
        blockBackNavigation(); // 👈 block back navigation
        return;
      }

      const parseRes = await response.json();

      if (response.ok) {
        localStorage.removeItem("token");
        setAuth(false);
        navigate("/");
        blockBackNavigation(); // 👈 block after logout
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
            className="s-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/");
              window.location.reload();
            }}
          >
            • Home
          </a>

          <a
            className="s-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/subjects");
            }}
          >
            • Browse
          </a>

          <a
            className="s-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/login");
            }}
          >
            • Login
          </a>

          <a
            className="s-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/faqs");
            }}
          >
            • FAQs
          </a>
        </>
      )}

      {/* Show Log out only if authenticated */}
      {isAuthenticated && !allowedRole && (
        <>
          <a
            className="s-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/home");
            }}
          >
            • Home
          </a>

          <a
            className="s-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/faqs");
            }}
          >
            • FAQs
          </a>

          <a
            className="s-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Add logout logic here
              handleLogout();
            }}
          >
            • Log out
          </a>
        </>
      )}
      {isAuthenticated && allowedRole && (
        <>
          <a
            className="s-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/home");
            }}
          >
            • Home
          </a>

          <a
            className="s-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/faqs");
            }}
          >
            • FAQs
          </a>
          <a
            className="bigScreen-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/home/reports");
            }}
          >
            • Reports
          </a>
          <a
            className="bigScreen-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/home/fileupload");
            }}
          >
            • Upload
          </a>
          <a
            className="bigScreen-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goSomeWhere("/home/filemoderation");
            }}
          >
            • File Moderation
          </a>

          <a
            className="s-anchor"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              // Add logout logic here
              handleLogout();
            }}
          >
            • Log out
          </a>
        </>
      )}
    </div>
  );
};

export default LeftNav;
