import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="card">
        <h1>🌿 Crop Disease Detector</h1>
        <p>Welcome! Detect plant diseases instantly using AI.</p>
        <button className="start-btn" onClick={() => navigate("/dashboard")}>
          Start Detection
        </button>
      </div>
    </div>
  );
}

export default Home;