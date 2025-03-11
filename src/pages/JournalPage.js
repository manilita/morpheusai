import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../pages/Sidebar";
import "../styles/JournalPage.css";

const JournalPage = () => {
  const [userText, setUserText] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const handleSubmit = async () => {
    if (!userText.trim()) return;

    try {
      const response = await axios.post("http://localhost:5050/generate", { userText });
      setAiResponse(response.data.response);
    } catch (error) {
      setAiResponse("Error fetching AI response.");
    }
  };

  return (
    <div className="journal-container">
      <Sidebar /> {/* Sidebar navigation */}
      <h2 className="journal-title">What did you dream about?</h2>
      <textarea
        className="journal-input"
        placeholder="Describe your dream..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />
      <button className="send-button" onClick={handleSubmit}>
        Analyze Dream
      </button>
      {aiResponse && (
        <div className="ai-response">
          <h3>AI Interpretation:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default JournalPage;
