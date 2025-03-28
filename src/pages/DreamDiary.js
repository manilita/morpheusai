import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DreamDiary.css";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import StarCanvas from "../components/starCanvas";

const DreamDiary = () => {
  const navigate = useNavigate();

  // Sample dream data (Replace with state if using API/local storage)
  const [dreams, setDreams] = useState([
    { id: 1, title: "Dog Dream" },
    { id: 2, title: "Nightmare" },
    { id: 3, title: "Falling Dream" },
  ]);

  // Function to delete a dream
  const handleDelete = (id) => {
    setDreams(dreams.filter((dream) => dream.id !== id));
  };

  // Function to edit a dream (placeholder for now)
  const handleEdit = (id) => {
    alert(`Editing dream with ID: ${id}`);
  };

  return (
    <div className="dream-diary-container">

      {/* Back Button */}
      <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
      </button>
        
      <h2 className="dream-diary-title">Dream Diary</h2>

      {/* Dream List */}
      <ul className="dream-list">
        {dreams.map((dream) => (
          <li key={dream.id} className="dream-item">
            <span className="dream-title">{dream.title}</span>
            <button className="edit-button" onClick={() => handleEdit(dream.id)}>
              <FaEdit />
            </button>
            <button className="delete-button" onClick={() => handleDelete(dream.id)}>
              <FaTrash />
            </button>
          </li>
        ))}
      </ul>
      <StarCanvas />
    </div>
  );
};

export default DreamDiary;
