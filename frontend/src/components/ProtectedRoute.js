import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" replace />;

  try {
    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000; // seconds

    if (decoded.exp && decoded.exp < currentTime) {
      // Token expired
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.error("Invalid token:", err);
    localStorage.removeItem("token");
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
