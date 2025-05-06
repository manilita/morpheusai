import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Settings.css";
import axios from "axios";
import { FaTimes, FaEdit, FaDownload } from "react-icons/fa";
import StarCanvas from "../components/starCanvas";

const Settings = (/*{user}*/) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("manilita");
  //const [password, setPassword] = useState("");
  //const [email, setEmail] = useState("");
  //const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    //const data = {username, password };
    axios.get("http://127.0.0.1:5000/api/user_profile", {withCredentials: true})
    .then((response) => {
      console.log("User profile: ", response.data)
      setUsername(response.data.Username);
      //setEmail(response.data.Email)
      //setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching user data: ", error);
      //setLoading(true);
    });
  }, []);
  
  // Function to handle username change
  const handleUsernameEdit = () => {
    const newUsername = prompt("Enter your new username:", username);
    if (newUsername) setUsername(newUsername);
  };

  // Function to handle password change
  const handleChangePassword = () => {
    alert("Redirecting to password change...");
  };

  // Function to handle downloading all dreams
  const handleDownloadDreams = () => {
    alert("Downloading all dreams as a file...");
  };

  //if(loading) return <div>Loading...</div>;

  return (
    <div className="settings-container">
      {/* Close Button */}
      <button className="close-button" onClick={() => navigate(-1)}>
        <FaTimes />
      </button>

      {/* Profile Section */}
      <div className="profile-card">
        <div className="profile-avatar"></div>
        <p className="username">
          {username}
          <FaEdit className="edit-icon" onClick={handleUsernameEdit} />
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
