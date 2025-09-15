import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation(); //useLocation() gives you the current route’s pathname.

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]); //Every time the pathname changes, the useEffect runs and calls window.scrollTo(0, 0).

  return null; // doesn't render anything
}

export default ScrollToTop;
