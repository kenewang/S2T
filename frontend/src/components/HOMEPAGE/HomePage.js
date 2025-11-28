import HomePageHeader from "./HomePageHeader";
import LeftNav from "../LeftNav";
import SearchOverlay from "../SearchOverlay";

import RightNav from "../RightNav";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScienceDocuments from "./ScienceDocuments";
import MathematicsDocuments from "./MathematicsDocuments";
import ProgrammingDocuments from "./ProgrammingDocuments";
import useFetchFiles from "../../hooks/useFetchFiles";
import NotFound from "../NotFound";
import { jwtDecode } from "jwt-decode";
import ArtsDocuments from "./ArtsDocuments";
import ChemistryDocuments from "./ChemistryDocuments";
import HistoryDocuments from "./HistoryDocuments";
import ManagementDocuments from "./ManagementDocuments";
import DesignDocuments from "./DesignDocuments";
import PsychologyDocuments from "./PsychologyDocuments";
import FinanceDocuments from "./FinanceDocuments";
const HomePage = ({
  leftNavRef, //passed down from App.js
  rightNavRef, //passed down from App.js

  isAuthenticated,
  setAuth,

  activeFileId,
  setActiveFileId,
}) => {
  const [ratingTrigger, setRatingTrigger] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const scienceData = useFetchFiles("science", ratingTrigger, setNotFound);

  const mathData = useFetchFiles("mathematics", ratingTrigger, setNotFound);
  const [showUploadIcon, setShowUploadIcon] = useState(false);
  const programmingData = useFetchFiles(
    "computer programming",
    ratingTrigger,
    setNotFound
  );

  const artsData = useFetchFiles("arts", ratingTrigger, setNotFound);
  const chemistryData = useFetchFiles("chemistry", ratingTrigger, setNotFound);
  const historyData = useFetchFiles("history", ratingTrigger, setNotFound);
  const managementData = useFetchFiles(
    "management",
    ratingTrigger,
    setNotFound
  );
  const designData = useFetchFiles("design", ratingTrigger, setNotFound);
  const psychologyData = useFetchFiles(
    "psychology",
    ratingTrigger,
    setNotFound
  );
  const financeData = useFetchFiles("finance", ratingTrigger, setNotFound);

  const [leftNavOpen, setLeftNavOpen] = useState(false);
  const [rightNavOpen, setRightNavOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const searchInputRef = useRef(null);

  const openLeftNav = () => setLeftNavOpen(true);
  const closeLeftNav = () => setLeftNavOpen(false);

  const openRightNav = () => setRightNavOpen(true);
  const closeRightNav = () => setRightNavOpen(false);

  const openSearch = () => setSearchActive(true);
  const closeSearch = () => setSearchActive(false);

  const navigate = useNavigate();

  const openRight = (fileId) => {
    setActiveFileId(fileId); // 👈 store the file being rated
    if (leftNavOpen) {
      closeLeftNav();
      openRightNav();
    } else openRightNav();
  };
  const openInNewTab = (url) => {
    if (!rightNavOpen && !leftNavOpen) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      closeRightNav();
      closeLeftNav();
    }
  };

  const handleClick = (id) => {
    if (!rightNavOpen && !leftNavOpen) navigate(`/documents/${id}`); // go to the page with the id
  };

  const handleRatingSubmitted = () => {
    setRatingTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const userRole = decoded.role;
      console.log("User role:", decoded.role);
      const validRoles = ["admin", "moderator", "educator"];
      if (!validRoles.includes(userRole)) return;
      setShowUploadIcon(true);
    }
  }, []);

  return (
    <div className="homeWrap">
      <section className="container">
        {!searchActive && (
          <>
            <HomePageHeader
              showSearchLogo={true}
              showUploadIcon={showUploadIcon}
              leftNavOpen={leftNavOpen}
              openLeftNav={openLeftNav}
              openSearch={openSearch}
              rightNavOpen={rightNavOpen}
              closeRightNav={closeRightNav}
              showPCSearch={true}
            />

            <LeftNav
              leftNavOpen={leftNavOpen}
              closeLeftNav={closeLeftNav}
              leftNavRef={leftNavRef}
              isAuthenticated={isAuthenticated}
              setAuth={setAuth}
              onRatingSubmitted={handleRatingSubmitted}
            />

            <RightNav
              rightNavRef={rightNavRef}
              closeRightNav={closeRightNav}
              rightNavOpen={rightNavOpen}
              activeFileId={activeFileId}
              onRatingSubmitted={handleRatingSubmitted} // <-- pass callback
              isAuthenticated={isAuthenticated}
            />

            {scienceData.loading ? (
              <p>Loading Science files...</p>
            ) : (
              <ScienceDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={scienceData.databaseNames}
                storage_path={scienceData.storagePath}
                file_rating={scienceData.fileRating}
                fileIds={scienceData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {designData.loading ? (
              <p>Loading Design files...</p>
            ) : (
              <DesignDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={designData.databaseNames}
                storage_path={designData.storagePath}
                file_rating={designData.fileRating}
                fileIds={designData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {managementData.loading ? (
              <p>Loading Management files...</p>
            ) : (
              <ManagementDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={managementData.databaseNames}
                storage_path={managementData.storagePath}
                file_rating={managementData.fileRating}
                fileIds={managementData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {psychologyData.loading ? (
              <p>Loading Psychology files...</p>
            ) : (
              <PsychologyDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={psychologyData.databaseNames}
                storage_path={psychologyData.storagePath}
                file_rating={psychologyData.fileRating}
                fileIds={psychologyData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {historyData.loading ? (
              <p>Loading History files...</p>
            ) : (
              <HistoryDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={historyData.databaseNames}
                storage_path={historyData.storagePath}
                file_rating={historyData.fileRating}
                fileIds={historyData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {mathData.loading ? (
              <p>Loading Math files...</p>
            ) : (
              <MathematicsDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={mathData.databaseNames}
                storage_path={mathData.storagePath}
                file_rating={mathData.fileRating}
                fileIds={mathData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {chemistryData.loading ? (
              <p>Loading Chemistry files...</p>
            ) : (
              <ChemistryDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={chemistryData.databaseNames}
                storage_path={chemistryData.storagePath}
                file_rating={chemistryData.fileRating}
                fileIds={chemistryData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {financeData.loading ? (
              <p>Loading Finance files...</p>
            ) : (
              <FinanceDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={financeData.databaseNames}
                storage_path={financeData.storagePath}
                file_rating={financeData.fileRating}
                fileIds={financeData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {programmingData.loading ? (
              <p>Loading Programming files...</p>
            ) : (
              <ProgrammingDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={programmingData.databaseNames}
                storage_path={programmingData.storagePath}
                file_rating={programmingData.fileRating}
                fileIds={programmingData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
            {artsData.loading ? (
              <p>Loading Arts files...</p>
            ) : (
              <ArtsDocuments
                openRightNav={openRightNav}
                closeLeftNav={closeLeftNav}
                closeRightNav={closeRightNav}
                leftNavOpen={leftNavOpen}
                rightNavOpen={rightNavOpen}
                databaseNames={artsData.databaseNames}
                storage_path={artsData.storagePath}
                file_rating={artsData.fileRating}
                fileIds={artsData.fileIds}
                handleClick={handleClick}
                openRight={openRight}
                openInNewTab={openInNewTab}
              />
            )}
          </>
        )}

        {notFound && (
          <>
            <NotFound />
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
          activeFileId={activeFileId}
        />
      </section>
      <div className="homePageFooter">
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};

export default HomePage;
