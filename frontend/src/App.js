import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      formData
    );

    setResult(response.data);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>🌱 Crop Disease Detector</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={handleUpload}>Predict</button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Disease: {result.disease}</h3>
          <h3>Confidence: {result.confidence}%</h3>
        </div>
      )}
    </div>
  );
}

export default App;