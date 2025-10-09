import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { useRef, useState, useEffect } from "react";
import "./global.css";
import "./normalize.css";

import useFiles from "./hooks/useFiles";

import ScrollToTop from "./components/ScrollToTop";
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

import Login from "./components/Login";
import "./components/Login.css";

import CreateAccount from "./components/CreateAccount";
import "./components/CreateAccount.css";

import Subjects from "./components/Subjects";
import "./components/Subjects.css";

import HomePage from "./components/HomePage";
import "./components/HomePage.css";
import SubjectDocuments from "./components/SubjectDocuments";

export default function App() {
  const [leftNavOpen, setLeftNavOpen] = useState(false);
  const [rightNavOpen, setRightNavOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);
  const searchInputRef = useRef(null);

  const showSearchLogo = useRef(true); //we are going to hide the search logo on some pages

  const openLeftNav = () => setLeftNavOpen(true);
  const closeLeftNav = () => setLeftNavOpen(false);

  const openRightNav = () => setRightNavOpen(true);
  const closeRightNav = () => setRightNavOpen(false);

  const openSearch = () => setSearchActive(true);
  const closeSearch = () => setSearchActive(false);

  const { databaseNames, storage_path, file_rating } = useFiles();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") //quick trick to turn something into a true/false
  );

  useEffect(() => {
    const token = localStorage.getItem("token"); //Check if there’s a saved token in the browser.
    if (token) {
      setIsAuthenticated(true); //If a token exists → mark the user as authenticated.
    }
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <LeftNav
                leftNavOpen={leftNavOpen}
                closeLeftNav={closeLeftNav}
                leftNavRef={leftNavRef}
              />
              <RightNav
                rightNavOpen={rightNavOpen}
                rightNavRef={rightNavRef}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                closeLeftNav={closeLeftNav}
                openRightNav={openRightNav}
              />

              {!searchActive && (
                <>
                  <Header
                    openLeftNav={openLeftNav}
                    openSearch={openSearch}
                    rightNavOpen={rightNavOpen}
                    closeRightNav={closeRightNav}
                    leftNavOpen={leftNavOpen}
                    showSearchLogo={showSearchLogo}
                  />

                  <main id="main-content">
                    <LoginBrowse
                      rightNavOpen={rightNavOpen}
                      leftNavOpen={leftNavOpen}
                    />
                    <DocumentList
                      openRightNav={openRightNav}
                      databaseNames={databaseNames}
                      storage_path={storage_path}
                      file_rating={file_rating}
                      rightNavOpen={rightNavOpen}
                      leftNavOpen={leftNavOpen}
                      closeRightNav={closeRightNav}
                      closeLeftNav={closeLeftNav}
                    />
                  </main>

                  <Footer
                    leftNavOpen={leftNavOpen}
                    closeLeftNav={closeLeftNav}
                    rightNavOpen={rightNavOpen}
                    closeRightNav={closeRightNav}
                  />
                </>
              )}

              <SearchOverlay
                searchActive={searchActive}
                closeSearch={closeSearch}
                searchInputRef={searchInputRef}
              />
            </div>
          }
        />

        <Route
          path="/login"
          element={
            <Login
              leftNavOpen={leftNavOpen}
              leftNavRef={leftNavRef}
              openLeftNav={openLeftNav}
              closeLeftNav={closeLeftNav}
              setAuth={setAuth}
            />
          }
        />
        <Route
          path="/createAccount"
          element={
            <CreateAccount
              leftNavOpen={leftNavOpen}
              leftNavRef={leftNavRef}
              openLeftNav={openLeftNav}
              closeLeftNav={closeLeftNav}
              setAuth={setAuth}
            />
          }
        />
        <Route
          path="/subjects"
          element={
            <Subjects
              leftNavOpen={leftNavOpen}
              leftNavRef={leftNavRef}
              openLeftNav={openLeftNav}
              closeLeftNav={closeLeftNav}
              openSearch={openSearch}
              searchActive={searchActive}
              closeSearch={closeSearch}
              searchInputRef={searchInputRef}
            />
          }
        />
        <Route
          path="/home"
          element={
            <HomePage
              leftNavRef={leftNavRef}
              openLeftNav={openLeftNav}
              closeLeftNav={closeLeftNav}
              openSearch={openSearch}
              searchActive={searchActive}
              closeSearch={closeSearch}
              searchInputRef={searchInputRef}
              databaseNames={databaseNames}
              storage_path={storage_path}
              rightNavRef={rightNavRef}
              file_rating={file_rating}
            />
          }
        />
        <Route
          path="/documents/:id"
          element={
            <SubjectDocuments
              leftNavRef={leftNavRef}
              rightNavRef={rightNavRef}
              databaseNames={databaseNames}
              storage_path={storage_path}
              file_rating={file_rating}
            />
          }
        />
      </Routes>
    </Router>
  );
}
