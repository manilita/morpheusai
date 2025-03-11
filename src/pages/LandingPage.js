import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/LandingPage.css";

const StarCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }

    const animateStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0 || star.x > canvas.width) star.speedX *= -1;
        if (star.y < 0 || star.y > canvas.height) star.speedY *= -1;
      });
      requestAnimationFrame(animateStars);
    };

    animateStars();
  }, []);

  return <canvas ref={canvasRef} className="star-canvas"></canvas>;
};

const LandingPage = () => {
  const navigate = useNavigate(); // Define navigate function
  return (
    <div className="landing-container">
      <StarCanvas />
      <h1 className="landing-title">Welcome to</h1>
      <h2 className="landing-subtitle">MORPHEUS</h2>
      <p className="landing-paragraph">Your AI dream journal</p>
      <button className="landing-button" onClick={() => navigate("/LoginPage")}>
        Start Journaling
      </button>
    </div>
  );
};

export default LandingPage;
