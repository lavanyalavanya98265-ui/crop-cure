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

  // 🌐 GET TRANSLATION
  const t = translations[language];

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>👤 {t.dashboard}</h1>

      <p><strong>{t.name}:</strong> {name}</p>
      <p><strong>{t.language}:</strong> {language}</p>

      <p>
        <strong>{t.location}:</strong>{" "}
        {typeof location === "object"
          ? `${location.lat?.toFixed(2)}, ${location.lng?.toFixed(2)}`
          : location || "Not available"}
      </p>

      <br />

      <button onClick={() => navigate("/upload")}>
        📷 {t.startScan}
      </button>

      <br /><br />

      <button onClick={() => navigate("/history")}>
        📜 {t.history}
      </button>

      <br /><br />

      <button
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/");
        }}
      >
        🚪 {t.logout}
      </button>
    </div>
  );
}

export default Dashboard;