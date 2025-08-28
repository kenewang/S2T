import { useEffect, useRef, useState } from "react";
import "./global.css"; // only global + reset styles

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

  // ref used for outside-click on the right sidenav
  const rightNavRef = useRef(null); //retuns {current: null}
  const rightNavWasOpenedAt = useRef(0); //returns {current: 0}
  const searchInputRef = useRef(null); //returns {current: null}

  // ====== functions equivalent to your original ones ======
  const openLeftNav = () => setLeftNavOpen(true); //function definition that opens the left Nav
  const closeLeftNav = () => setLeftNavOpen(false); //function definition that closes the left Nav

  const openRightNav = () => {
    setRightNavOpen(true); //opens the right Nav
    // emulate the tiny delay before attaching listener in vanilla JS
    rightNavWasOpenedAt.current = performance.now(); //store the precise time it took for the right nav to open
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
    }
  }, [searchActive]);

  // ====== outside click for the right sidenav ======
  useEffect(() => {
    if (!rightNavOpen) return;

    const outsideClickListener = (event) => {
      const target = event.target;
      // Allow a brief moment after opening so the initial click doesn't immediately close it
      const justOpened = performance.now() - rightNavWasOpenedAt.current < 50;
      if (justOpened) return;

      const clickedInsideNav = rightNavRef.current?.contains(target);
      const clickedMenuImage = target?.closest?.("img");

      if (!clickedInsideNav && !clickedMenuImage) {
        closeRightNav();
      }
    };

    document.addEventListener("click", outsideClickListener);
    return () => document.removeEventListener("click", outsideClickListener);
  }, [rightNavOpen]);

  return (
    <div className="App">
      {/* Left and Right navs are always rendered so CSS width transition works */}
      <LeftNav isOpen={leftNavOpen} closeLeftNav={closeLeftNav} />
      <RightNav ref={rightNavRef} isOpen={rightNavOpen} />

      {/* Header + main are hidden while search overlay is active to mimic your JS */}
      {!searchActive && (
        <>
          <Header openLeftNav={openLeftNav} openSearch={openSearch} />

          <main id="main-content">
            <div className="login-browse">
              <button type="button" className="login-button">
                Login
              </button>
              <button type="button" className="browse-button">
                Browse
              </button>
            </div>

            <DocumentList openRightNav={openRightNav} />
          </main>

          <Footer />
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
