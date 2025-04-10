import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";
import { FaTimes, FaEdit, FaDownload } from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("JohnDoe@example.com");

  // Function to handle email edit
  const handleEmailEdit = () => {
    const newEmail = prompt("Enter your new email:", email);
    if (newEmail) setEmail(newEmail);
  };

  // Function to handle password change
  const handleChangePassword = () => {
    alert("Redirecting to password change...");
  };

  // Function to handle downloading all dreams
  const handleDownloadDreams = () => {
    alert("Downloading all dreams as a file...");
  };

  return (
    <div className="settings-container">
      {/* Close Button */}
      <button className="close-button" onClick={() => navigate(-1)}>
        <FaTimes />
      </button>

      {/* Profile Section */}
      <div className="profile-card">
        <div className="profile-avatar"></div>
        <p className="email">
          {email}{" "}
          <FaEdit className="edit-icon" onClick={handleEmailEdit} />
        </p>
        <p className="change-password" onClick={handleChangePassword}>
          Change Password? <FaEdit className="edit-icon" />
        </p>
        <button className="download-button" onClick={handleDownloadDreams}>
          Download All Dreams <FaDownload />
        </button>
      </div>
    </div>
  );
};

export default Settings;
