import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./global.css";
import "./normalize.css";

import LeftNav from "./components/LeftNav";
import "./components/LeftNav.css";

import RightNav from "./components/RightNav";
import "./components/RightNav.css";

import Header from "./components/Header";
import "./components/Header.css";

import LoginBrowse from "./components/LoginBrowse";

import SearchOverlay from "./components/SearchOverlay";
import "./components/SearchOverlay.css";

import DocumentList from "./components/DocumentList";
import "./components/DocumentList.css";

import Footer from "./components/Footer";
import "./components/Footer.css";

export default function App() {
  const [leftNavOpen, setLeftNavOpen] = useState(false);
  const [rightNavOpen, setRightNavOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);
  const searchInputRef = useRef(null);

  const [databaseNames, setDatabaseNames] = useState([]);
  const [storage_path, setStoragePath] = useState([]);

  const openLeftNav = () => setLeftNavOpen(true);
  const closeLeftNav = () => setLeftNavOpen(false);

  const openRightNav = () => setRightNavOpen(true);
  const closeRightNav = () => setRightNavOpen(false);

  const openSearch = () => setSearchActive(true);
  const closeSearch = () => setSearchActive(false);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const res = await fetch("http://localhost:8081/files/names");
        setDatabaseNames(await res.json());
      } catch (error) {
        console.error("Error fetching names", error);
      }
    };
    fetchNames();
  }, []);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await fetch("http://localhost:8081/files/links");
        setStoragePath(await res.json());
      } catch (error) {
        console.error("Error fetching links", error);
      }
    };
    fetchLinks();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <LeftNav
                isOpen={leftNavOpen}
                closeLeftNav={closeLeftNav}
                leftNavRef={leftNavRef}
              />
              <RightNav
                isOpen={rightNavOpen}
                rightNavRef={rightNavRef}
                closeRightNav={closeRightNav}
                isLeftNavOpen={leftNavOpen}
                closeLeftNav={closeLeftNav}
                openRightNav={openRightNav}
              />

              {!searchActive && (
                <>
                  <Header
                    openLeftNav={openLeftNav}
                    openSearch={openSearch}
                    isRightNavOpen={rightNavOpen}
                    closeRightNav={closeRightNav}
                    isLeftNavOpen={leftNavOpen}
                  />

                  <main id="main-content">
                    <LoginBrowse />
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

              <SearchOverlay
                isActive={searchActive}
                onBack={closeSearch}
                inputRef={searchInputRef}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}
