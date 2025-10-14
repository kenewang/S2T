import { useEffect, useState } from "react";

const useFiles = (ratingTrigger) => {
  const [databaseNames, setDatabaseNames] = useState([]);
  const [storage_path, setStoragePath] = useState([]);
  const [file_rating, setFileRating] = useState([]);
  const [fileIds, setFileId] = useState([]);

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
      } catch (error) {
        console.error("Error fetching file data", error);
      }
    };

    fetchData();
  }, [ratingTrigger]); // re-run when ratingTrigger changes

  return { databaseNames, storage_path, file_rating, fileIds };
};

export default useFiles;
