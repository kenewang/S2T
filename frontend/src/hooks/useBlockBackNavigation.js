// src/hooks/useBlockBackNavigation.js
import { useEffect } from "react";

export default function useBlockBackNavigation(isAuthenticated) {
  useEffect(() => {
    if (!isAuthenticated) return; // only run when logged in

    // push two dummy states
    window.history.pushState(null, "", window.location.href);
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      // cleanup when user logs out
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isAuthenticated]);
}
