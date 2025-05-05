import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";
import axios from "axios";
import { FaTimes, FaEdit, FaDownload } from "react-icons/fa";
import StarCanvas from "../components/starCanvas";

const Settings = (/*{user}*/) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("JohnDoe@example.com");
  //if (!user) return <p>Please log in to see your profile.</p>;
  /*
  const [user, setUser] = useState(null);
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/users/<int:user_id>')
    .then(response => setUser(response.data))
    .catch(error => console.error('Error fetching user data: ',
      error));
  }, []);

  if(!user) return <div>Loading...</div>;
*/
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
      <StarCanvas />
    </div>
  );
};

export default Settings;
