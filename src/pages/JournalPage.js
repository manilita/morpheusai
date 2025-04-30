import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../pages/Sidebar";
import "../styles/JournalPage.css";
import StarCanvas from "../components/starCanvas";

const JournalPage = () => {
  const [userText, setUserText] = useState("");
  const [aiResponse,setAiResponse] = useState("");

  const handleSave = async () => {
    const entry = {
      dream: userText,
      story: aiResponse
    };
  
    try {
      await fetch('https://your-mockapi-or-flask-api/dreams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
  
      alert("✅ Dream saved to your journal!");
    } catch (err) {
      console.error("Save failed:", err);
      alert("⚠️ Failed to save dream.");
    }
  };
  
  const handleSubmit = async () => {
    if (!userText.trim()) return;
  
    try {
      console.log("Sending request to backend...");
      setUserText("Generating your dream story..."); // Show temporary loading message
      const response = await axios.post("http://localhost:5050/generate", { userText });
      console.log("AI Response:", response.data);
      
      setUserText(response.data.response); // Replace input with AI response
    } catch (error) {
      console.error("Frontend API Error:", error);
      setUserText("Error fetching AI response.");
    }
  };
  
  return (
    <div className="journal-container">
      <Sidebar />
      <h2 className="journal-title">What did you dream about?</h2>
      <textarea
        className="journal-input"
        placeholder="Describe your dream..."
        value={userText}
        onChange={(e) => setUserText(e.target.value)}
      />
      <button className="send-button" onClick={handleSubmit}>
        Generate Dream Story
      </button>
      {aiResponse && (
  <div className="ai-output">
    <h3>AI-Generated Story:</h3>
    <textarea
      readOnly
      value={aiResponse}
      rows={8}
      style={{ width: "100%", marginTop: "1rem", padding: "1rem" }}
    />
    <button className="refine-button" onClick={() => {
      setUserText(aiResponse);  // Let user move AI output back to input
      setAiResponse("");        // Clear output area
    }}>
      Refine AI Output
    </button>
  </div> // ✅ this closes the ai-output div
)}     
<StarCanvas />
    </div>
  );
};

export default JournalPage;
