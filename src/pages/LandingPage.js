import React from "react";
import "../styles/LandingPage.css"; // Import CSS file

const LandingPage = () => {
  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to</h1>
      <h2 className="landing-subtitle">MORPHEUS</h2>
      <p className="Landing-paragrpah">Your AI Dream Journal</p>
      <button className="landing-button">Start Journaling</button>
    </div>
  );
};

export default LandingPage;
