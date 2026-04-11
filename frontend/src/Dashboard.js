import React from "react";
import { useNavigate } from "react-router-dom";
import translations from "./language";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <h2>No user found</h2>;
  }

  const { name, language, location } = user;
  const t = translations[language];

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(135deg, #4caf50, #81c784)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "20px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>👤 {t.dashboard}</h2>

        <p><strong>{t.name}:</strong> {name}</p>
        <p><strong>{t.language}:</strong> {language}</p>
        <p><strong>{t.location}:</strong> {location}</p>

        <br />

        <button
          onClick={() => navigate("/upload")}
          style={buttonStyle}
        >
          📷 {t.startScan}
        </button>

        <button
          onClick={() => navigate("/history")}
          style={buttonStyle}
        >
          📜 {t.history}
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/");
          }}
          style={{
            ...buttonStyle,
            background: "#e53935",
          }}
        >
          🚪 {t.logout}
        </button>
      </div>
    </div>
  );
}

// 🔥 BUTTON STYLE (reuse)
const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "10px",
  borderRadius: "10px",
  border: "none",
  background: "#4caf50",
  color: "#fff",
  fontSize: "16px",
  cursor: "pointer",
  transition: "0.3s",
};

export default Dashboard;