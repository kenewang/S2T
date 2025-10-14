import menu_icon from "../svg/iconmonstr-menu-dot-vertical-filled.svg";
import file_icon from "../svg/icons8-file-100.png";
import "./HomePage.css";

import { useState, useEffect } from "react";
const ScienceDocuments = ({
  openRight,
  openInNewTab,

  handleClick,
}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [databaseNames, setDatabaseNames] = useState([]);
  const [storage_path, setStoragePath] = useState([]);
  const [file_rating, setFileRating] = useState([]);
  const [fileIds, setFileId] = useState([]);

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

  useEffect(() => {
    const fetchMathFiles = async () => {
      try {
        const res = await fetch("http://localhost:8081/files/science");
        setDatabaseNames(await res.json());

        const res2 = await fetch("http://localhost:8081/links/science");
        setStoragePath(await res2.json());

        const res3 = await fetch("http://localhost:8081/ratings/science");
        setFileRating(await res3.json());

        const res4 = await fetch("http://localhost:8081/ids/science");
        setFileId(await res4.json());
      } catch (error) {
        console.error("Error fetching data", error);
      }

      fetchMathFiles();
    };
  }, []);

  return (
    <>
      <a
        className="section-heading"
        onClick={() => {
          handleClick("mathematics");
        }}
      >
        Science
      </a>

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
              const fileId = fileIds[i]; // 👈 match each name/link/rating with its ID

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
                    onClick={() => openRight(fileId)} // 👈 pass fileId
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

export default ScienceDocuments;
