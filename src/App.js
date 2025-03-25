import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; //landing page 
import JournalPage from "./pages/JournalPage"; // journal page 
import DreamDiary from "./pages/DreamDiary"; // Diary page 
import Settings from "./pages/Settings"; // Import Settings Page
import LoginPage from "./pages/LoginPage"; 
import SignupPage from "./pages/SignupPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />  
        <Route path="/journal" element={<JournalPage />} /> 
        <Route path="/dream-diary" element={<DreamDiary/>} />
        <Route path="/settings" element={<Settings/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/Signup" element={<SignupPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
