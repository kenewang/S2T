import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Component, useEffect, useRef, useState } from "react";
import "./global.css";
import "./normalize.css";

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

  const [databaseNames, setDatabaseNames] = useState([]);
  const [storage_path, setStoragePath] = useState([]);
  const [file_rating, setFileRating] = useState([]);

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
        setDatabaseNames(await res.json()); //trigger a refresh, this time with the actual file names from the database
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

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await fetch("http://localhost:8081/files/ratings");
        setFileRating(await res.json());
      } catch (error) {
        console.error("Error fetching ratings", error);
      }
    };
    fetchRatings();
  }, []);

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
          path="/documents"
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
