import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams(); // token from URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = "Share2Teach - Reset Password";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),

        credentials: "include", // Important for cookies/sessions
      });

      const data = await response.json();
      setMessage(data.msg);
    } catch (err) {
      console.error(err);
      setMessage("Error resetting password. Try again.");
    }
  };

  return (
    <div className="reset-password-container">
      <h1 className="reset-heading">Reset Password</h1>

      <form className="reset-form" onSubmit={handleSubmit}>
        <input
          className="reset-input"
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="reset-input"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button className="reset-button" type="submit">
          Reset Password
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
