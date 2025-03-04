import React, { useState } from "react";
import { Link } from "react-router-dom"; // For navigation
import "../styles/Sidebar.css"; // Import styling
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and close icons

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle menu

  return (
    <div>
      {/* Hamburger Button */}
      <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${isOpen ? "open" : ""}`}>
        <ul>
          <li>
            <Link to="/dream-diary" onClick={() => setIsOpen(false)}>Dream Diary</Link>
          </li>
          <li>
            <Link to="/settings" onClick={() => setIsOpen(false)}>Settings</Link>
          </li>
          <li>
            <Link to="/" onClick={() => setIsOpen(false)}>Log Out</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
