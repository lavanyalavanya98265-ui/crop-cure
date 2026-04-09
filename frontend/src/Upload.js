import React, { useState } from "react";
import axios from "axios";

// 🔥 STEP 1: Disease info (ADD HERE - TOP)
const diseaseInfo = {
  "Potato___Early_blight": {
    treatment: "Use fungicide spray and remove infected leaves.",
    prevention: "Avoid overhead watering and ensure proper spacing."
  },
  "Potato___Late_blight": {
    treatment: "Apply copper-based fungicides immediately.",
    prevention: "Ensure good air circulation and avoid wet leaves."
  },
  "Tomato___Target_Spot": {
    treatment: "Use appropriate fungicides and remove affected areas.",
    prevention: "Keep foliage dry and maintain plant hygiene."
  },
  "Healthy": {
    treatment: "No treatment needed. Plant is healthy.",
    prevention: "Maintain regular care and monitoring."
  }
};

function Upload() {

  // 🔥 STEP 2: States (ADD HERE - INSIDE FUNCTION)
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  // 🔥 STEP 3: Upload function
  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      setResult(response.data);

    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to backend");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>📷 Upload Leaf Image</h2>

      {/* 🔥 STEP 4: File input */}
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      {/* 🔥 STEP 5: Button */}
      <button onClick={handleUpload}>Predict</button>

      {/* 🔥 STEP 6: Show result */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Disease: {result.disease}</h3>
          <h3>Confidence: {result.confidence}%</h3>
        </div>
      )}
      {result && diseaseInfo[result.disease] && (
        <div style={{ marginTop: "20px" }}>
            <h3>🩺 Treatment</h3>
            <p>{diseaseInfo[result.disease].treatment}</p>

            <h3>🌱 Prevention</h3>
            <p>{diseaseInfo[result.disease].prevention}</p>
        </div>
        )}

      {/* 🔥 STEP 7: Treatment + Prevention */}
      {result && diseaseInfo[result.disease] && (
        <div style={{ marginTop: "20px" }}>
          <h3>🩺 Treatment</h3>
          <p>{diseaseInfo[result.disease].treatment}</p>

          <h3>🌱 Prevention</h3>
          <p>{diseaseInfo[result.disease].prevention}</p>
        </div>
      )}
    </div>
  );
}

export default Upload;