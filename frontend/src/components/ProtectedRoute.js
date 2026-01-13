import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const validate = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000; // in seconds

        // 1. Check expiry
        if (decoded.exp && decoded.exp < currentTime) {
          localStorage.removeItem("token");
          setIsValid(false);
          return;
        }

        // 2. Check token version
        const userId = Number(decoded.sub);
        const tokenVersion = Number(decoded.token_version);

        const res = await fetch(
          `${API_URL}/api/auth/verify-token?userId=${userId}&tokenVersion=${tokenVersion}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const versionValid = await res.json();

        if (!versionValid) {
          // mismatch, remove token
          localStorage.removeItem("token");
          setIsValid(false);
        } else {
          setIsValid(true);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        setIsValid(false);
      }
    };

    validate();
  }, []);

  // While checking, return nothing or loader
  if (isValid === null) return null;

  return isValid ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
