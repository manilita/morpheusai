import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";
import StarCanvas from "../components/starCanvas";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://67cfa704823da0212a82e739.mockapi.io/users");
      const users = await response.json();

      const matchedUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (matchedUser) {
        onLogin && onLogin(matchedUser); // Pass user info if handler is provided
        navigate("/journal");
      } else {
        alert("Incorrect username or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again later.");
    }

    setLoading(false);
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
            required
          />
          <input
            type="password"
            className="login-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button className="login-button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
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
