import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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

      // 🔥 GET USER
      const user = JSON.parse(localStorage.getItem("user"));
      const historyKey = `history_${user.name}`;

      // 🔥 GET OLD HISTORY
      const history = JSON.parse(localStorage.getItem(historyKey)) || [];

      // 🔥 ADD NEW ENTRY
      history.unshift({
        disease: data.disease,
        confidence: data.confidence,
        time: new Date().toLocaleString()
      });

      // 🔥 SAVE BACK
      localStorage.setItem(historyKey, JSON.stringify(history));

      // 🔥 NAVIGATE
      navigate("/solution", { state: { result: data } });

    } catch (error) {
      alert("Error uploading image");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>📷 Upload Leaf Image</h1>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>
        🔍 Predict
      </button>
    </div>
  );
}

export default Upload;