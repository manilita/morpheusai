import React, { useState } from "react";
import Sidebar from "../pages/Sidebar";
import "../styles/JournalPage.css";
import StarCanvas from "../components/starCanvas";

const JournalPage = () => {
  const [userText, setUserText] = useState("");
  const [aiResponse,setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
  
    try {
      console.log("Sending request to backend...");
      const response = await fetch("http://localhost:5050/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt: userText })  // ✅ fixed
      });
      
      const data = await response.json(); // ✅ parse response
      console.log("AI Response:", data);
  
      if (data.story) {
        setAiResponse(data.story);
      } else {
        setAiResponse("Error: No story returned.");
      }
    } catch (error) {
      console.error("Frontend API Error:", error);
      setAiResponse("Error fetching AI response.");
    } finally {
      setIsLoading(false);
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
      {isLoading && <p style={{ color: "#888", fontStyle: "italic" }}>✨ Generating your dream story...</p>}

      {aiResponse && (
  <div className="ai-output">
    <h3>AI-Generated Story:</h3>
    <textarea
    value={aiResponse}
    onChange={(e) => setAiResponse(e.target.value)}
    rows={8}
    style={{ width: "100%", marginTop: "1rem", padding: "1rem" }}
   />

<div className="button-row">
<button className="send-button" onClick={() => {
  setUserText(aiResponse);
  handleSubmit();
}}>
  Refine with AI
</button>
  <button className="save-button" onClick={handleSave}>
  Save to Journal
</button>
</div>

  </div> // ✅ this closes the ai-output div
)}     
<StarCanvas />
    </div>
  );
};

export default JournalPage;
