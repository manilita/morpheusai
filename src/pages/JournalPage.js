import React, { useState } from "react";
import "../styles/JournalPage.css";

const JournalPage = () => {
  const [dreamText, setDreamText] = useState("");

  const handleInputChange = (event) => {
    setDreamText(event.target.value);
  };

  const handleSubmit = () => {
    if (dreamText.trim() !== "") {
      console.log("Submitted Dream:", dreamText);
      setDreamText(""); // Clear input after submission
    }
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevents a new line in the textarea
      handleSubmit();
    }
  };

  return (
    <div className="journal-container">
      <h2 className="journal-title">What did you dream about?</h2>
      <textarea
        className="journal-input"
        placeholder="Write your dream here..."
        value={dreamText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown} // Capture Enter key
      ></textarea>
      <button className="send-button" onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default JournalPage;
