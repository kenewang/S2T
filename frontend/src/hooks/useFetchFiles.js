import { useState, useEffect } from "react";

const useFetchFiles = (subject, ratingTrigger) => {
  const [databaseNames, setDatabaseNames] = useState([]);
  const [storagePath, setStoragePath] = useState([]);
  const [fileRating, setFileRating] = useState([]);
  const [fileIds, setFileIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!subject) return; // Don't fetch if no subject is provided

    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all four in parallel for better performance
        const [resNames, resLinks, resRatings, resIds] = await Promise.all([
          fetch(`http://localhost:8081/files/${subject}`),
          fetch(`http://localhost:8081/links/${subject}`),
          fetch(`http://localhost:8081/ratings/${subject}`),
          fetch(`http://localhost:8081/ids/${subject}`),
        ]);

        // Parse responses
        const [names, links, ratings, ids] = await Promise.all([
          resNames.json(),
          resLinks.json(),
          resRatings.json(),
          resIds.json(),
        ]);

        // Update state
        setDatabaseNames(names);
        setStoragePath(links);
        setFileRating(ratings);
        setFileIds(ids);
      } catch (err) {
        console.error("Error fetching files:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [subject, ratingTrigger]); // Re-run whenever subject and ratingTrigger changes

  return { databaseNames, storagePath, fileRating, fileIds, loading, error };
};

export default useFetchFiles;
