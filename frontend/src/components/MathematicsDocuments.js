import menu_icon from "../svg/iconmonstr-menu-dot-vertical-filled.svg";
import file_icon from "../svg/icons8-file-100.png";
import "./HomePage.css";

import { useState } from "react";
const MathematicsDocuments = ({
  databaseNames,
  storage_path,
  OpenRight,
  openInNewTab,
  file_rating,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const next = () => {
    if (startIndex < databaseNames.length - 2) {
      setStartIndex(startIndex + 1);
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <>
      <a className="section-heading">Mathematics</a>

      <section className="carousel-container">
        <button
          className="carousel-btn left"
          onClick={prev}
          disabled={startIndex === 0}
        >
          ‹
        </button>

        <div className="carousel-viewport">
          <div
            className="carousel-track"
            style={{
              transform: `translateX(-${startIndex * (140 + 16)}px)`, // 140px doc width + 16px gap
            }}
          >
            {databaseNames.map((item, i) => {
              const extIndex = item.lastIndexOf(".");
              const name = extIndex === -1 ? item : item.slice(0, extIndex);
              const ext = extIndex === -1 ? "" : item.slice(extIndex);
              const link = storage_path[i];
              const rating = file_rating[i];

              return (
                <div className="document" key={i}>
                  <img
                    className="file_icon"
                    src={file_icon}
                    alt="file_icon"
                    onClick={() => openInNewTab(link)}
                  />

                  <p className="rating">
                    <span className="rating_span">{rating}</span> Rating
                  </p>
                  <img
                    className="three_dot"
                    src={menu_icon}
                    alt="Options"
                    onClick={OpenRight}
                  />
                  <p
                    className="truncate-middle"
                    onClick={() => window.open(link, "_blank")}
                  >
                    <span className="start">{name}</span>
                    <span className="end">{ext}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <button
          className="carousel-btn right"
          onClick={next}
          disabled={startIndex >= databaseNames.length - 2}
        >
          ›
        </button>
      </section>
    </>
  );
};

export default MathematicsDocuments;
