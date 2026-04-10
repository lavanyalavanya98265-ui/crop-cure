import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  // 🔥 GET USER DATA
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h2>No user found. Please login again.</h2>;
  }

  const { name, language, location } = user;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>👤 User Dashboard</h1>

      <p><strong>Name:</strong> {name}</p>
      <p><strong>Language:</strong> {language}</p>

      <p>
        <strong>Location:</strong>{" "}
        {typeof location === "object"
          ? `${location.lat?.toFixed(2)}, ${location.lng?.toFixed(2)}`
          : location || "Not available"}
      </p>

      <br />

      <button onClick={() => navigate("/upload")}>
        📷 Start Scan
      </button>

      <br /><br />

      <button onClick={() => navigate("/history")}>
        📜 History
      </button>

      <br /><br />

      {/* 🔥 LOGOUT BUTTON */}
      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
}

export default Dashboard;