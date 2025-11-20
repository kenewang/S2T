import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./useFiles.css";
import "sweetalert2/dist/sweetalert2.min.css";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const useFiles = (ratingTrigger, setNotFound) => {
  const [databaseNames, setDatabaseNames] = useState([]);
  const [storage_path, setStoragePath] = useState([]);
  const [file_rating, setFileRating] = useState([]);
  const [fileIds, setFileId] = useState([]);
  const [selectedGradeRange, setSelectedGradeRange] = useState("");

  // 🟩 Fetch all files normally (when rating changes)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [namesRes, linksRes, ratingsRes, idRes] = await Promise.all([
          fetch("http://localhost:8081/files/names"),
          fetch("http://localhost:8081/files/links"),
          fetch("http://localhost:8081/files/ratings"),
          fetch("http://localhost:8081/files/ids"),
        ]);

        setDatabaseNames(await namesRes.json());
        setStoragePath(await linksRes.json());
        setFileRating(await ratingsRes.json());
        setFileId(await idRes.json());
        setNotFound(false);
      } catch (error) {
        console.error("Error fetching file data", error);
      }
    };

    fetchData();
  }, [ratingTrigger]);

  // 🟦 Fetch filtered files when grade range changes
  useEffect(() => {
    if (!selectedGradeRange) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchFilteredFiles = async () => {
      try {
        console.log("Fetching filtered files...");
        const res = await fetch(
          `http://localhost:8081/files/by-grade/${selectedGradeRange}`,
          { signal }
        );
        const files = await res.json();

        setDatabaseNames(files.map((d) => d.fileName));
        setStoragePath(files.map((d) => d.filePath));
        setFileRating(files.map((d) => d.fileRating));
        setFileId(files.map((d) => d.id)); // ✅ use "id" instead of "fileId"

        console.log("Fetched filtered files:", files);
        console.log("file IDs:", fileIds);

        if (files.length === 0) setNotFound(true);
        else setNotFound(false);
      } catch (err) {
        console.error("Error fetching filtered files:", err);
      }
    };

    fetchFilteredFiles();
  }, [selectedGradeRange]);

  // Define the popup inside hook (so it can use setSelectedGradeRange)
  const handlePopUp = async () => {
    await MySwal.fire({
      title: "Grade",
      input: "radio",
      inputOptions: {
        primary: "R - 7",
        secondary: "8 - 12",
        tertiary: "Tertiary",
      },
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        popup: "radio-popup",
        title: "radio-title",
        input: "options",
      },
      didOpen: () => {
        const radios = Swal.getPopup().querySelectorAll("input[type=radio]");
        radios.forEach((radio) => {
          radio.addEventListener("change", (e) => {
            setSelectedGradeRange(e.target.value);
            setTimeout(() => {
              Swal.close();
            }, 300);
          });
        });
      },
    });
  };

  // ✅ Return everything
  return {
    databaseNames,
    storage_path,
    file_rating,
    fileIds,
    handlePopUp, // 👈 exported here
    selectedGradeRange,
  };
};

export default useFiles;
