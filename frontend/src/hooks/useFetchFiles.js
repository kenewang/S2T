import { useState, useEffect } from "react";

const useFetchFiles = (subject, ratingTrigger, setNotFound) => {
  const [databaseNames, setDatabaseNames] = useState([]);
  const [storagePath, setStoragePath] = useState([]);
  const [fileRating, setFileRating] = useState([]);
  const [fileIds, setFileIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!subject) return; // Don't fetch if no subject is provided

    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all four in parallel for better performance

        const [resNames, resLinks, resRatings, resIds] = await Promise.all([
          fetch(`${API_URL}/api/files/${subject}`, {
            method: "GET",
          }),
          fetch(`${API_URL}/api/links/${subject}`, {
            method: "GET",
          }),
          fetch(`${API_URL}/api/ratings/${subject}`, {
            method: "GET",
          }),
          fetch(`${API_URL}/api/ids/${subject}`, {
            method: "GET",
          }),
        ]);

        // Parse responses
        const [names, links, ratings, ids] = await Promise.all([
          resNames.json(),
          resLinks.json(),
          resRatings.json(),
          resIds.json(),
        ]);

        // ✅ Handle "no files found"
        if (names.length === 0) {
          setNotFound?.(true); // only call if setNotFound is provided
        } else {
          setNotFound?.(false);
        }

        // Update state
        setDatabaseNames(names);
        setStoragePath(links);
        setFileRating(ratings);
        setFileIds(ids);
      } catch (err) {
        console.error("Error fetching files:", err);
        setError(err);
        setNotFound?.(true); // If there’s an error, assume nothing found
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [subject, ratingTrigger]); // Re-run when subject or ratingTrigger changes

  return { databaseNames, storagePath, fileRating, fileIds, loading, error };
};

export default useFetchFiles;
