import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";
import StarCanvas from "../components/starCanvas";

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('https://67cfa704823da0212a82e739.mockapi.io/:endpoint');
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const users = await response.json();
    
            const matchedUser = users.find(
                (user) => user.username === username && user.password === password
            );
    
            if (matchedUser) {
                console.log("✅ Login successful:", matchedUser);
                onLogin(matchedUser); // Could pass token or user ID if needed
                navigate("/journal");
            } else {
                alert("❌ Incorrect username or password. Please try again.");
            }
        } catch (error) {
            console.error("🔥 Fetch/Login Error:", error);
            alert("⚠️ An error occurred while trying to log in. Please check your connection or try again later.");
        }
    };
    

    return (
        <div className="login-container">
            <h1 className="login-title">Log in</h1>
            <form onSubmit={handleSubmit}>
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
