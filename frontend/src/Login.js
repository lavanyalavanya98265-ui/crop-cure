import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("English");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!name) {
      alert("Enter your name");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await res.json();

          const place =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown";

          localStorage.setItem(
            "user",
            JSON.stringify({
              name,
              language,
              location: place,
            })
          );

          navigate("/dashboard");
        } catch {
          alert("Location error");
        }
      },
      () => alert("Allow location access")
    );
  };

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
          padding: "40px",
          borderRadius: "20px",
          width: "320px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>🌿 Crop Cure</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
          }}
        />

        <select
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <option>English</option>
          <option>Kannada</option>
          <option>Hindi</option>
        </select>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border: "none",
            background: "#4caf50",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          🚀 Login
        </button>
      </div>
    </div>
  );
}

export default Login;