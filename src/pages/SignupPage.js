import {useNavigate, Link} from "react-router-dom";
import React, { useState } from "react";
import "../styles/SignupPage.css";
import StarCanvas from "../components/starCanvas";
// import { IoHandLeft } from "react-icons/io5";
//import axios from "axios";
//import { withRouter } from "react-router-dom";
//import { API_BASE_URL } from "../components/apiConstants";

const SignupPage = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleSignup = async (e) => {
      e.preventDefault();
  
      if (!email || !username || !password || !confirmPassword) {
        alert("Please fill in all fields.");
        return;
      }
  
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
  
      try {
        const response = await fetch("http://127.0.0.1:5000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, password }),
        });
  
        if (response.ok) {
          alert("Signup successful! You can now log in.");
          navigate("/login");
        } else {
          alert("Signup failed. Please try again.");
        }
      } catch (error) {
        console.error("Signup error:", error);
        alert("An error occurred. Please try again later.");
      }
    };
    return (
        <div className="login-container">
            <h1 className="login-title">Sign Up</h1>
            <form onSubmit={handleSignup}>
              <div className="input-container">
              <input 
                    className="login-email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    className="userName"
                    type="username" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input 
                    className="login-password"
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input 
                    className="password-confirm"
                    type="password" 
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
              </div>
                
            
            <button className="signup-button" onClick={handleSignup}>Sign Up</button>
            </form>
            <p className="signin-text">Already have an account? <Link to="/Login" className="Signin-Link">Sign in!</Link></p>
            <StarCanvas />
        </div>
    );
};

export default SignupPage;