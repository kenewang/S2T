const SearchOverlay = ({ isActive, onBack, inputRef }) => {
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
        ref={inputRef}
        type="text"
        placeholder="Search all items..."
        className="search-field"
      />
    </div>
  );
};

export default SearchOverlay;
