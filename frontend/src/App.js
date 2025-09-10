import { useEffect, useRef, useState } from "react";
import "./global.css"; // only global + reset styles
import "./normalize.css";

import LeftNav from "./components/LeftNav";
import "./components/LeftNav.css";

import RightNav from "./components/RightNav";
import "./components/RightNav.css";

import Header from "./components/Header";
import "./components/Header.css";

import SearchOverlay from "./components/SearchOverlay";
import "./components/SearchOverlay.css";

import DocumentList from "./components/DocumentList";
import "./components/DocumentList.css";

import Footer from "./components/Footer";
import "./components/Footer.css";

export default function App() {
  // ==== state mirrors the original vanilla JS behaviour ====
  const [leftNavOpen, setLeftNavOpen] = useState(false); //the left nav is hidden when page loads
  const [rightNavOpen, setRightNavOpen] = useState(false); //the right nav is hidden when page loads
  const [searchActive, setSearchActive] = useState(false); //the search area is hidden when the page loads
  // ref used for outside-click on the left sidenav
  const leftNavRef = useRef(null);
  const leftNavWasOpenedAt = useRef(0);
  // ref used for outside-click on the right sidenav
  const rightNavRef = useRef(null); //retuns {current: null}
  const rightNavWasOpenedAt = useRef(0); //returns {current: 0}
  const searchInputRef = useRef(null); //returns {current: null}

  const [databaseNames, setDatabaseNames] = useState([]);

  const [storage_path, setFileNamesLinks] = useState([]);

  // ====== functions equivalent to your original ones ======

  const openLeftNav = () => {
    setLeftNavOpen(true);
    leftNavWasOpenedAt.current = performance.now();
  }; //function definition that opens the left Nav
  const closeLeftNav = () => setLeftNavOpen(false); //function definition that closes the left Nav

  const openRightNav = () => {
    setRightNavOpen(true); //opens the right Nav
    // emulate the tiny delay before attaching listener in vanilla JS
    rightNavWasOpenedAt.current = performance.now(); //store how long since the App.js rendered the rightNav was opened, like when the App.js renders the timer starts counting, and rightNav might be clicked at like 40ms.

    //now rightNavWasOpenedAt is {current: the precise time it took the right nav to open}
  };
  const closeRightNav = () => setRightNavOpen(false); //function definition that closes the right Nav

  const openSearch = () => setSearchActive(true); //function definition that opens the search
  const closeSearch = () => setSearchActive(false); //function definition that closes the search

  // ====== focus the search input when the overlay opens ======
  useEffect(() => {
    if (searchActive) {
      // wait for overlay to mount, then focus input
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });

      closeRightNav();

      //requestAnimationFrame is faster and smoother than using setTimeout because the browser can optimize animations and rendering.

      //The ? is a safety check. It’s like saying: “Only try to focus if the input is actually there — otherwise, skip it.”
    }
  }, [searchActive]);
  //The [searchActive] let's the useEffect run only when the searchActive value changes. When "searchActive" is true, the useEffect code inside its body runs and when "searchActive" is false, the useEffect still runs but does nothing

  // ====== outside click for the left sidenav ======

  useEffect(() => {
    if (!leftNavOpen) return;

    const outsideClickListener_forLeftNav = (event) => {
      const target = event.target;

      const justOpened = performance.now() - leftNavWasOpenedAt.current < 50;
      if (justOpened) return;
      const clickedInsideNav = leftNavRef.current?.contains(target);

      if (!clickedInsideNav) closeLeftNav();
    };

    document.addEventListener("click", outsideClickListener_forLeftNav);
    return () =>
      document.removeEventListener("click", outsideClickListener_forLeftNav);
  }, [leftNavOpen]);

  // ====== outside click for the right sidenav ======
  useEffect(() => {
    if (!rightNavOpen) return;

    const outsideClickListener_forRightNav = (event) => {
      const target = event.target; //the exact element you clicked on the page.
      // Allow a brief moment after opening so the initial click doesn't immediately close it
      const justOpened = performance.now() - rightNavWasOpenedAt.current < 50; //“If the nav was opened just now (within 50ms), ignore outside clicks.

      if (justOpened) return;

      const clickedInsideNav = rightNavRef.current?.contains(target); //if rightNafRef is the same as target (where you clicked), ie the same <div>, return true. else false.
      const clickedMenuImage = target?.closest?.("img"); //goes up the dom tree of the parent element until it finds the first <img>. If it finds one → it returns that <img> element. else returns null.

      if (!clickedInsideNav && !clickedMenuImage) {
        closeRightNav(); //the only way rightNav can close is if you did not click inside it or clicked the three dot menu
      }
    };

    document.addEventListener("click", outsideClickListener_forRightNav);
    return () =>
      document.removeEventListener("click", outsideClickListener_forRightNav);
  }, [rightNavOpen]);

  //fetch file names from DB
  useEffect(() => {
    const getNames = async () => {
      try {
        const names = await fetch("http://localhost:8081/files/names");
        const namesArray = await names.json();
        setDatabaseNames(namesArray); // ✅ update state so UI re-renders
      } catch (error) {
        console.log("Error", error);
      }
    };

    getNames(); // ✅ call the function
  }, []); // ✅ run only once when App.js loads

  //fetch file links from DB
  useEffect(() => {
    const getFileLinks = async () => {
      try {
        const fileLinks = await fetch("http://localhost:8081/files/links");
        const fileLinksArray = await fileLinks.json();
        setFileNamesLinks(fileLinksArray); // ✅ update state so UI re-renders
      } catch (error) {
        console.log("Error", error);
      }
    };

    getFileLinks(); // ✅ call the function
  }, []); // ✅ run only once when App.js loads

  return (
    <div className="App">
      {/* Left and Right navs are always rendered so CSS width transition works */}
      <LeftNav
        isOpen={leftNavOpen}
        closeLeftNav={closeLeftNav}
        leftNavRef={leftNavRef}
      />
      <RightNav rightNavRef={rightNavRef} isOpen={rightNavOpen} />

      {/* Header + main are hidden while search overlay is active to mimic your JS */}
      {!searchActive && (
        <>
          <Header
            openLeftNav={openLeftNav}
            openSearch={openSearch}
            rightNavOpen={rightNavOpen}
            closeRightNav={closeRightNav}
          />

          <main id="main-content">
            <div className="login-browse">
              <button type="button" className="login-button">
                Login
              </button>
              <button type="button" className="browse-button">
                Browse
              </button>
            </div>

            <DocumentList
              openRightNav={openRightNav}
              databaseNames={databaseNames}
              storage_path={storage_path}
              isRightNavOpen={rightNavOpen}
              isLeftNavOpen={leftNavOpen}
              closeRightNav={closeRightNav}
              closeLeftNav={closeLeftNav}
            />
          </main>

          <Footer
            isLeftNavOpen={leftNavOpen}
            closeLeftNav={closeLeftNav}
            isRightNavOpen={rightNavOpen}
            closeRightNav={closeRightNav}
          />
          <div className="copyright">&copy; 2025 Share2Teach</div>
        </>
      )}

      {/* Search overlay stays mounted and toggles its .active class */}
      <SearchOverlay
        isActive={searchActive}
        onBack={closeSearch}
        inputRef={searchInputRef}
      />
    </div>
  );
}
