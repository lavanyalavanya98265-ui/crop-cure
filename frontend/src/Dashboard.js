import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">

        <h1>👤 User Dashboard</h1>

        <div className="user-info">
          <p><strong>Name:</strong> Lavanya</p>
          <p><strong>Location:</strong> Karnataka, India 📍</p>
        </div>

        <div className="buttons">
          <button 
            className="btn"
            onClick={() => navigate("/upload")}
          >
            📷 Start Scan
          </button>

          <button
            className="btn secondary"
            onClick={() => navigate("/history")}
          >
            📜 History
          </button>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;