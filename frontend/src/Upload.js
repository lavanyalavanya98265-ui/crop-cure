import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 🔥 Disease info
const diseaseInfo = {
  "Potato___Early_blight": {
    treatment: "Early blight is a fungal disease that affects potato leaves and stems. Remove infected leaves immediately. Apply fungicides regularly. Ensure proper spacing. Avoid watering leaves directly. Monitor plants daily.",
    prevention: "Use resistant varieties. Maintain spacing. Rotate crops. Avoid overhead watering. Keep leaves dry. Clean tools regularly.",
  },
  "Healthy": {
    treatment: "The plant is healthy. Maintain regular care.",
    prevention: "Provide sunlight, water, and nutrients properly.",
  },
  "Tomato_Early_blight": {
    treatment: "Early blight is a fungal disease that affects tomato leaves and reduces yield. Remove infected leaves immediately to prevent spread. Apply fungicides such as chlorothalonil or copper-based sprays. Ensure proper spacing between plants to improve airflow. Avoid watering the leaves directly and keep foliage dry. Monitor plants regularly for early signs.",
    prevention: "Use disease-resistant tomato varieties whenever possible. Maintain proper plant spacing to reduce humidity. Avoid overhead irrigation and water at the base of the plant. Rotate crops regularly to prevent soil infection. Keep the garden clean from plant debris. Ensure plants receive adequate sunlight."
  },
};

function Upload() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // 🔥 THIS LINE

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData
      );

      const data = response.data;

      // 🔥 Navigate to solution page
      navigate("/solution", {
        state: {
          result: data,
          diseaseInfo: diseaseInfo
        }
      });

    } catch (error) {
      console.error("Error:", error);
      alert("Backend not connected");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>📷 Upload Leaf Image</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload}>Predict</button>
    </div>
  );
}

export default Upload;