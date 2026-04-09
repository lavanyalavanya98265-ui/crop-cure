import React from "react";
import { useLocation } from "react-router-dom";

function Solution() {
  const location = useLocation();
  const result = location.state?.result;
  console.log("NEW CODE RUNNING");
  // 🔥 SAFETY CHECK
  if (!result) {
    return <h2 style={{ textAlign: "center" }}>No Data Available</h2>;
  }

  // 🔥 EXTRACT CROP NAME
  const cropName = result.disease.split("_")[0];

  // 🔥 SUPPORTED CROPS
  const supportedCrops = ["Potato", "Tomato", "Pepper"];

  // 🔥 HEALTHY CHECK
  const isHealthy = result.disease.toLowerCase().includes("healthy");

  // 🔥 UNKNOWN CHECK (CORRECT LOGIC)
  const isUnknown =
    !supportedCrops.includes(cropName) ||
    (isHealthy && result.confidence > 90);

  

  // 🔥 SEVERITY LOGIC
  const getSeverity = (confidence) => {
    if (confidence > 90) return "HIGH ⚠️";
    if (confidence > 70) return "MEDIUM ⚡";
    return "LOW ✅";
  };

  // 🔥 DYNAMIC SOLUTION GENERATOR
  const generateSolution = (diseaseName) => {
    const parts = diseaseName.split("_");
    const crop = parts[0];
    const disease = parts.slice(1).join(" ");

    return {
      treatment: `${disease} is a common disease affecting ${crop} plants. It is usually caused by fungal or bacterial infections. Remove infected leaves immediately to prevent spreading. Apply suitable fungicides or organic treatments based on severity. Ensure proper plant spacing to improve airflow. Regular monitoring is essential to control the disease effectively.`,

      prevention: `To prevent ${disease} in ${crop}, maintain proper plant hygiene and avoid overwatering. Ensure good air circulation around plants. Use disease-resistant varieties whenever possible. Avoid wetting leaves during irrigation. Rotate crops regularly to reduce soil infection. Regular inspection helps in early detection and prevention.`
    };
  };

  const solution = generateSolution(result.disease);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #66bb6a, #a5d6a7)",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1>🌿 Disease Analysis</h1>

      {!isUnknown && (
        <>
            <h2>Disease: {result.disease}</h2>
            <h3>Confidence: {result.confidence}%</h3>
        </>
    )}
      {/* 🔥 UNKNOWN CASE */}
      {isUnknown ? (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h3>⚠️ Unknown Plant</h3>
          <p>
            This plant is not supported by the system. Please upload images of
            Potato 🥔, Tomato 🍅, or Pepper 🌶️ leaves for accurate detection.
          </p>
        </div>
      ) : isHealthy ? (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <h3>🌿 Plant Status: Healthy ✅</h3>
          <p>
            Your plant is in good condition. Continue regular care, proper
            watering, and monitoring. No treatment is required. Maintain soil
            health and proper sunlight exposure.
          </p>
        </div>
      ) : (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            marginTop: "20px",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
          }}
        >
          <h3>Severity: {getSeverity(result.confidence)}</h3>

          <h3>🩺 Treatment</h3>
          <p>{solution.treatment}</p>

          <h3>🌱 Prevention</h3>
          <p>{solution.prevention}</p>
        </div>
      )}
    </div>
  );
}

export default Solution;