import { useEffect } from "react";

const SearchOverlay = ({ searchActive, closeSearch, searchInputRef }) => {
  useEffect(() => {
    if (searchActive) {
      requestAnimationFrame(() => {
        searchInputRef.current?.focus();
      });
    }
  }, [searchActive, searchInputRef]);

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
        ref={searchInputRef} //we need this in order to have the remote control to the <input> element on the page
        //at first "inputRef" is {current: null} but when React finishes showing the <input> to the screen, inputRef is { current: <input type="text" ... /> }

        type="text"
        placeholder="Search all items..."
        className="search-field"
      />
    </div>
  );
};

export default SearchOverlay;
