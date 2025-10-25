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
import NotFound from "./components/NotFound";
import Faqs from "./components/Faqs";
import useBlockBackNavigation from "./hooks/useBlockBackNavigation";

export default function App() {
  const [leftNavOpen, setLeftNavOpen] = useState(false);
  const [rightNavOpen, setRightNavOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [activeFileId, setActiveFileId] = useState(null);

  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);
  const searchInputRef = useRef(null);

  const showSearchLogo = useRef(true); //we are going to hide the search logo on some pages

  // trigger that causes re-fetch / re-render when incremented
  const [ratingTrigger, setRatingTrigger] = useState(0);

  const openLeftNav = () => setLeftNavOpen(true);
  const closeLeftNav = () => setLeftNavOpen(false);

  const openRightNav = () => setRightNavOpen(true);
  const closeRightNav = () => setRightNavOpen(false);

  const openSearch = () => setSearchActive(true);
  const closeSearch = () => setSearchActive(false);

  const { databaseNames, storage_path, file_rating, fileIds, handlePopUp } =
    useFiles(ratingTrigger, setNotFound);

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") //quick trick to turn something into a true/false
  );

  useBlockBackNavigation(isAuthenticated);

  useEffect(() => {
    const token = localStorage.getItem("token"); //Check if there’s a saved token in the browser.
    if (token) {
      setIsAuthenticated(true); //If a token exists → mark the user as authenticated.
    }
  }, []);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  // callback passed to RightNav
  const handleRatingSubmitted = () => {
    setRatingTrigger((prev) => prev + 1);
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
                isAuthenticated={isAuthenticated}
                setAuth={setAuth}
                onRatingSubmitted={handleRatingSubmitted}
              />

              <RightNav
                rightNavOpen={rightNavOpen}
                rightNavRef={rightNavRef}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                closeLeftNav={closeLeftNav}
                openRightNav={openRightNav}
                activeFileId={activeFileId}
                isAuthenticated={isAuthenticated}
                onRatingSubmitted={handleRatingSubmitted} // <-- pass callback
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

                  <main className="main-content" id="main-content">
                    <LoginBrowse
                      rightNavOpen={rightNavOpen}
                      leftNavOpen={leftNavOpen}
                    />

                    <button className="grade_landingPage" onClick={handlePopUp}>
                      View By Grade
                    </button>
                    <DocumentList
                      openRightNav={openRightNav}
                      databaseNames={databaseNames}
                      storage_path={storage_path}
                      file_rating={file_rating}
                      rightNavOpen={rightNavOpen}
                      leftNavOpen={leftNavOpen}
                      closeRightNav={closeRightNav}
                      closeLeftNav={closeLeftNav}
                      fileIds={fileIds} // 👈 must come from backend fetch
                      setActiveFileId={setActiveFileId}
                    />
                  </main>

                  {notFound && (
                    <>
                      <NotFound />
                    </>
                  )}

                  <Footer
                    className="main-footer"
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
                openRightNav={openRightNav}
                rightNavOpen={rightNavOpen}
                leftNavOpen={leftNavOpen}
                closeRightNav={closeRightNav}
                closeLeftNav={closeLeftNav}
                setActiveFileId={setActiveFileId}
                rightNavRef={rightNavRef}
                onRatingSubmitted={handleRatingSubmitted} // <-- pass callback
                ratingTrigger={ratingTrigger}
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
              onRatingSubmitted={handleRatingSubmitted}
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
              setActiveFileId={setActiveFileId}
              openRightNav={openRightNav}
              rightNavOpen={rightNavOpen}
              closeRightNav={closeRightNav}
              rightNavRef={rightNavRef}
              onRatingSubmitted={handleRatingSubmitted} // <-- pass callback
              ratingTrigger={ratingTrigger}
              activeFileId={activeFileId}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route
          path="/home"
          element={
            <HomePage
              isAuthenticated={isAuthenticated}
              setAuth={setAuth}
              leftNavRef={leftNavRef}
              openLeftNav={openLeftNav}
              closeLeftNav={closeLeftNav}
              rightNavRef={rightNavRef}
              activeFileId={activeFileId}
              fileIds={fileIds} // 👈 must come from backend fetch
              setActiveFileId={setActiveFileId}
            />
          }
        />
        <Route
          path="/documents/:id"
          element={
            <SubjectDocuments
              isAuthenticated={isAuthenticated}
              setAuth={setAuth}
            />
          }
        />
        <Route
          path="/faqs"
          element={
            <Faqs
              leftNavOpen={leftNavOpen}
              closeLeftNav={closeLeftNav}
              leftNavRef={leftNavRef}
              isAuthenticated={isAuthenticated}
              setAuth={setAuth}
              onRatingSubmitted={handleRatingSubmitted}
              openLeftNav={openLeftNav}
              openSearch={openSearch}
              rightNavOpen={rightNavOpen}
              closeRightNav={closeRightNav}
              showSearchLogo={showSearchLogo}
              searchActive={searchActive}
              closeSearch={closeSearch}
              searchInputRef={searchInputRef}
              openRightNav={openRightNav}
              scloseRightNav={closeRightNav}
              setActiveFileId={setActiveFileId}
              rightNavRef={rightNavRef}
              ratingTrigger={ratingTrigger}
            />
          }
        />
      </Routes>
    </Router>
  );
}
