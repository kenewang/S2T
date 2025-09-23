import { useEffect, useState } from "react";

const useFiles = () => {
  const [databaseNames, setDatabaseNames] = useState([]);
  const [storage_path, setStoragePath] = useState([]);
  const [file_rating, setFileRating] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [namesRes, linksRes, ratingsRes] = await Promise.all([
          fetch("http://localhost:8081/files/names"),
          fetch("http://localhost:8081/files/links"),
          fetch("http://localhost:8081/files/ratings"),
        ]);

        setDatabaseNames(await namesRes.json());
        setStoragePath(await linksRes.json());
        setFileRating(await ratingsRes.json());
      } catch (error) {
        console.error("Error fetching file data", error);
      }
    };

    fetchData();
  }, []);

  return { databaseNames, storage_path, file_rating };
};

export default useFiles;
