import Header from "./Header";
import LeftNav from "./LeftNav";
import SearchOverlay from "./SearchOverlay";
import RightNav from "./RightNav";
import DocumentList from "./DocumentList";
import "./SubjectDocuments.css";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const SubjectDocuments = ({ isAuthenticated, setAuth }) => {
  const { id } = useParams();
  const MySwal = withReactContent(Swal);
  const [databaseNames, setDatabaseNames] = useState([]);
  const [storage_path, setStoragePath] = useState([]);
  const [file_rating, setFileRating] = useState([]);
  const [fileIds, setFileId] = useState([]);

  const [leftNavOpen, setLeftNavOpen] = useState(false);
  const [rightNavOpen, setRightNavOpen] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const searchInputRef = useRef(null);
  const leftNavRef = useRef(null);
  const rightNavRef = useRef(null);

  const openSearch = () => setSearchActive(true);
  const closeSearch = () => setSearchActive(false);

  const openLeftNav = () => setLeftNavOpen(true);
  const closeLeftNav = () => setLeftNavOpen(false);

  const openRightNav = () => setRightNavOpen(true);
  const closeRightNav = () => setRightNavOpen(false);

  const [activeFileId, setActiveFileId] = useState(null);

  const [ratingTrigger, setRatingTrigger] = useState(0);

  const [selectedGradeRange, setSelectedGradeRange] = useState("");

  useEffect(() => {
    if (!selectedGradeRange) return;

    const delay = setTimeout(() => {
      const fetchFilteredFiles = async () => {
        try {
          console.log("Fetching filtered files...");
          const res = await fetch(
            `http://localhost:8081/files/by-subject-grade/${id}/${selectedGradeRange}`
          );
          const files = await res.json();

          setDatabaseNames(files.map((d) => d.fileName));
          setStoragePath(files.map((d) => d.filePath));
          setFileRating(files.map((d) => d.fileRating));
          setFileId(files.map((d) => d.fileId));

          console.log("Fetched filtered files:", files);
        } catch (err) {
          console.error("Error fetching filtered files:", err);
        }
      };

      fetchFilteredFiles();
    }, 300);

    return () => clearTimeout(delay);
  }, [selectedGradeRange, id]);

  useEffect(() => {
    const validIds = ["science", "mathematics", "computer programming"];
    if (!validIds.includes(id)) return;

    // 🧠 skip fetching all files if user has already chosen a grade
    if (selectedGradeRange) return;

    const fetchFiles = async () => {
      try {
        console.log("Fetching all files for subject:", id);
        const res = await fetch(`http://localhost:8081/files/${id}`);
        setDatabaseNames(await res.json());

        const res2 = await fetch(`http://localhost:8081/links/${id}`);
        setStoragePath(await res2.json());

        const res3 = await fetch(`http://localhost:8081/ratings/${id}`);
        setFileRating(await res3.json());

        const res4 = await fetch(`http://localhost:8081/ids/${id}`);
        setFileId(await res4.json());
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchFiles();
  }, [id, ratingTrigger, selectedGradeRange]);

  const onRatingSubmitted = () => {
    setRatingTrigger((prev) => prev + 1);
  };

  const handleSort = async () => {
    await MySwal.fire({
      title: "Grade",
      input: "radio",
      inputOptions: {
        primary: "R - 7",
        secondary: "8 - 12",
        tertiary: "Higher Education",
      },
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        popup: "radio-popup",
        title: "radio-title",
        confirmButton: "success-button-confirm",
      },
      didOpen: () => {
        const radios = Swal.getPopup().querySelectorAll("input[type=radio]");
        radios.forEach((radio) => {
          radio.addEventListener("change", (e) => {
            setSelectedGradeRange(e.target.value);
            Swal.close();
          });
        });
      },
    });
  };

  return (
    <div>
      <section className="subject_Container">
        {!searchActive && (
          <>
            <Header
              showSearchLogo={true}
              leftNavOpen={leftNavOpen}
              rightNavOpen={rightNavOpen}
              openLeftNav={openLeftNav}
              openSearch={openSearch}
              openRightNav={openRightNav}
              closeRightNav={closeRightNav}
            />

            <LeftNav
              leftNavOpen={leftNavOpen}
              closeLeftNav={closeLeftNav}
              leftNavRef={leftNavRef}
              isAuthenticated={isAuthenticated}
              setAuth={setAuth}
            />

            <RightNav
              rightNavRef={rightNavRef}
              closeRightNav={closeRightNav}
              rightNavOpen={rightNavOpen}
              activeFileId={activeFileId}
              onRatingSubmitted={onRatingSubmitted} // <-- pass callback
            />

            <button className="grade" onClick={handleSort}>
              View By Grade
            </button>
            <main className="docs_container">
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
          onRatingSubmitted={onRatingSubmitted} // <-- pass callback
          ratingTrigger={ratingTrigger}
          activeFileId={activeFileId}
        />
      </section>
      <div className="subjectDocumentsFooter">
        <p>Contact</p>
        <p>&copy; 2025 Share2Teach</p>
      </div>
    </div>
  );
};
export default SubjectDocuments;
