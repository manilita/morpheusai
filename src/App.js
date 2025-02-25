import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import JournalPage from "./pages/JournalPage"; // New page

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  
        <Route path="/journal" element={<JournalPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
