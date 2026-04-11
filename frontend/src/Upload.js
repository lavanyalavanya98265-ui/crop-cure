import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import translations from "./language";

function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // 🌐 USER + LANGUAGE
  const user = JSON.parse(localStorage.getItem("user"));
  const t = translations[user.language];

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      const data = response.data;

      // 🔥 USER BASED HISTORY
      const historyKey = `history_${user.name}`;
      const history = JSON.parse(localStorage.getItem(historyKey)) || [];

      history.unshift({
        disease: data.disease,
        confidence: data.confidence,
        time: new Date().toLocaleString()
      });

      localStorage.setItem(historyKey, JSON.stringify(history));

      navigate("/solution", { state: { result: data } });

    } catch (error) {
      alert("Error uploading image");
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #66bb6a, #a5d6a7)",
        paddingTop: "80px",
      }}
    >
      {/* 🌿 TITLE */}
      <h1>📷 {t.uploadTitle}</h1>

      <br />

      {/* 📂 FILE INPUT */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      {/* 🔍 PREDICT BUTTON */}
      <button
        onClick={handleUpload}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer"
        }}
      >
        🔍 {t.predict}
      </button>
    </div>
  );
}

export default Upload;