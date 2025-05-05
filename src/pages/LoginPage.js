import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/LoginPage.css";
import StarCanvas from "../components/starCanvas";

const LoginPage = ({onLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
  
      const result = await response.json();
  
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(result));
        onLogin && onLogin(result); // Pass user info if handler is provided
        navigate("/journal");
      } else {
        alert(result.error || "Incorrect username or password.");
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

        <button className="login-button" type="submit" disabled={loading} onClick={handleLogin}>
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
