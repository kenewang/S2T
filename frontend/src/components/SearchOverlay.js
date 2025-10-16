import { useState, useEffect } from "react";
import DocumentList from "./DocumentList";
import RightNav from "./RightNav";

const SearchOverlay = ({
  searchActive,
  closeSearch,
  searchInputRef,
  openRightNav,
  rightNavOpen,
  leftNavOpen,
  closeRightNav,
  closeLeftNav,
  setActiveFileId,
  rightNavRef,
  activeFileId,
  onRatingSubmitted,
}) => {
  const [query, setQuery] = useState("");
  const [databaseNames, setDatabaseNames] = useState([]);
  const [storage_path, setStoragePath] = useState([]);
  const [file_rating, setFileRating] = useState([]);
  const [fileIds, setFileId] = useState([]);

  // --- Function to handle searching ---
  const handleSearch = async () => {
    if (query.trim() === "") return;

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const res = await fetch(
        `http://localhost:8081/files/search?query=${query}`,
        { signal }
      );
      const data = await res.json();

      setDatabaseNames(data.map((d) => d.fileName));
      setStoragePath(data.map((d) => d.filePath));
      setFileRating(data.map((d) => d.fileRating));
      setFileId(data.map((d) => d.fileId));
    } catch (err) {
      if (err.name === "AbortError") console.log("Fetch aborted 👋");
      else console.error("Fetch error:", err);
    }

    // return cleanup to abort fetch if needed
    return () => controller.abort();
  };

  // --- Handle Enter key ---
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // --- Focus input when overlay opens ---
  useEffect(() => {
    if (searchActive) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [searchActive, searchInputRef]);

  // --- Clear search results when overlay closes ---
  useEffect(() => {
    if (!searchActive) {
      setQuery("");
      setDatabaseNames([]);
      setStoragePath([]);
      setFileRating([]);
      setFileId([]);
    }
  }, [searchActive]);

  return (
    <div
      className={`search-overlay ${searchActive ? "active" : ""}`}
      id="search-overlay"
    >
      <button
        id="back-btn"
        className="back-arrow"
        onClick={closeSearch}
        aria-label="Back"
      >
        ←
      </button>

      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search all items..."
        className="search-field"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <RightNav
        rightNavRef={rightNavRef}
        closeRightNav={closeRightNav}
        rightNavOpen={rightNavOpen}
        activeFileId={activeFileId}
        onRatingSubmitted={onRatingSubmitted} // <-- pass callback
      />

      <main className="main-stuff">
        <DocumentList
          openRightNav={openRightNav}
          databaseNames={databaseNames}
          storage_path={storage_path}
          file_rating={file_rating}
          rightNavOpen={rightNavOpen}
          leftNavOpen={leftNavOpen}
          closeRightNav={closeRightNav}
          closeLeftNav={closeLeftNav}
          fileIds={fileIds}
          setActiveFileId={setActiveFileId}
        />
      </main>
    </div>
  );
};

export default SearchOverlay;
