import { useEffect } from "react";

const SearchOverlay = ({ isActive, onBack, inputRef }) => {
  useEffect(() => {
    if (isActive) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isActive, inputRef]);

  return (
    <div
      className={`search-overlay ${isActive ? "active" : ""}`}
      id="search-overlay"
    >
      <button
        id="back-btn"
        className="back-arrow"
        onClick={onBack}
        aria-label="Back"
      >
        ←
      </button>
      <input
        ref={inputRef} //we need this in order to have the remote control to the <input> element on the page
        //at first "inputRef" is {current: null} but when React finishes showing the <input> to the screen, inputRef is { current: <input type="text" ... /> }

        type="text"
        placeholder="Search all items..."
        className="search-field"
      />
    </div>
  );
};

export default SearchOverlay;
