import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";
import StarCanvas from "../components/starCanvas";

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        const response = await fetch("https://67cfa704823da0212a82e739.mockapi.io/users");
        const users = await response.json();
  
        const matchedUser = users.find(
          (user) => user.username === username && user.password === password
        );
  
        if (matchedUser) {
          onLogin(matchedUser); // Optional: save token/user info
          navigate("/journal");
        } else {
          alert("Incorrect username or password.");
        }
      } catch (error) {
        console.error("Login error:", error);
        alert("An error occurred. Please try again later.");
      }
    };
      
    return (
        <div className="login-container">
            <h1 className="login-title">Log in</h1>
            <form onSubmit={handleLogin}>
              <div className="input-container">
              <input
                    type="text"
                    className="userName"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    className="login-password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
              </div>
                
                <button type="submit" className="login-button">
                    Log In
                </button>
            </form>
            <p className="signup-text">
                Don't have an account?{" "}
                <Link to="/Signup" className="Signup-Link">
                    Sign up!
                </Link>
            </p>
            <StarCanvas />
        </div>
    );
};

export default LoginPage;
