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

  navigator.geolocation.getCurrentPosition(async (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    try {
      // 🌍 Convert to place name
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await res.json();

      const place =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        "Unknown location";

      // 🔥 Save everything
      localStorage.setItem(
        "user",
        JSON.stringify({
          name,
          language,
          location: place,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      alert("Error fetching location");
    }
  });
};

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🌿 Crop Cure Login</h1>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
        <button onClick={() => localStorage.clear()}>
  🧹        Clear Data
        </button>
      <br /><br />

      <select onChange={(e) => setLanguage(e.target.value)}>
        <option value="English">English</option>
        <option value="Kannada">Kannada</option>
        <option value="Hindi">Hindi</option>
      </select>

      <br /><br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;