import React from "react";
import { useLocation } from "react-router-dom";
import translations from "./language";

function Solution() {
  const location = useLocation();
  const result = location.state?.result;

  if (!result) {
    return <h2 style={{ textAlign: "center" }}>No Data Available</h2>;
  }

  // 🔥 USER + LANGUAGE
  const user = JSON.parse(localStorage.getItem("user"));
  const t = translations[user.language];

  // 🔥 EXTRACT CROP
  const cropName = result.disease.split("_")[0];

  const supportedCrops = ["Potato", "Tomato", "Pepper"];

  const isHealthy = result.disease.toLowerCase().includes("healthy");

  const isUnknown =
    !supportedCrops.includes(cropName) ||
    (isHealthy && result.confidence > 90);

  const getSeverity = (confidence) => {
    if (confidence > 90) return "HIGH ⚠️";
    if (confidence > 70) return "MEDIUM ⚡";
    return "LOW ✅";
  };

  // 🌐 MULTI-LANGUAGE SOLUTION
  const generateSolution = (diseaseName, language) => {
    const parts = diseaseName.split("_");
    const crop = parts[0];
    const disease = parts.slice(1).join(" ");

    if (language === "Kannada") {
      return {
        treatment: `${crop} ಸಸ್ಯದಲ್ಲಿ ${disease} ಸಾಮಾನ್ಯ ರೋಗವಾಗಿದೆ. ಸೋಂಕಿತ ಎಲೆಗಳನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಸೂಕ್ತ ಔಷಧಿಗಳನ್ನು ಬಳಸಿ. ಸರಿಯಾದ ಗಾಳಿ ಹರಿವು ಮತ್ತು ಅಂತರವನ್ನು ಕಾಪಾಡಿ. ನಿಯಮಿತ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಾಗಿದೆ.`,
        prevention: `${crop} ಸಸ್ಯದ ಸ್ವಚ್ಛತೆ ಕಾಪಾಡಿ, ಅತಿಯಾದ ನೀರಿನ ಬಳಕೆಯನ್ನು ತಪ್ಪಿಸಿ, ಉತ್ತಮ ಗಾಳಿ ಹರಿವು ಒದಗಿಸಿ ಮತ್ತು ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಳಸಿ. ನಿಯಮಿತ ಪರಿಶೀಲನೆ ರೋಗ ತಡೆಯಲು ಸಹಾಯಕ.`
      };
    }

    if (language === "Hindi") {
      return {
        treatment: `${crop} पौधों में ${disease} एक सामान्य रोग है। संक्रमित पत्तियों को हटाएं और उचित दवाइयों का उपयोग करें। उचित दूरी और वायु संचार बनाए रखें। नियमित निरीक्षण आवश्यक है।`,
        prevention: `${crop} पौधों की स्वच्छता बनाए रखें, अधिक पानी देने से बचें, अच्छी हवा का प्रवाह सुनिश्चित करें और रोग-प्रतिरोधी किस्मों का उपयोग करें। नियमित जांच से रोग रोका जा सकता है।`
      };
    }

    return {
      treatment: `${disease} is a common disease affecting ${crop} plants. Remove infected leaves and apply proper fungicides. Ensure proper spacing and airflow. Regular monitoring is required.`,
      prevention: `Maintain plant hygiene, avoid overwatering, ensure good air circulation, and use resistant varieties. Regular inspection helps prevent disease.`
    };
  };

  const solution = generateSolution(result.disease, user.language);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #66bb6a, #a5d6a7)",
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>🌿 Disease Analysis</h1>

      {!isUnknown && (
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            borderRadius: "12px",
            width: "400px",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            marginBottom: "20px",
          }}
        >
          <h2>{t.disease}: {result.disease}</h2>
          <p><strong>{t.confidence}:</strong> {result.confidence}%</p>

          {!isHealthy && (
            <p><strong>{t.severity}:</strong> {getSeverity(result.confidence)}</p>
          )}
        </div>
      )}

      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "15px",
          width: "600px",
          boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
        }}
      >
        {isUnknown ? (
          <div style={{ textAlign: "center" }}>
            <h2>⚠️ {t.unknownMsg}</h2>
            <p>
              This plant is not supported. Please upload Potato 🥔,
              Tomato 🍅 or Pepper 🌶️ leaves.
            </p>
          </div>
        ) : isHealthy ? (
          <div style={{ textAlign: "center" }}>
            <h2>🌿 {t.healthyMsg}</h2>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: "20px" }}>
              <h3>🩺 {t.treatment}</h3>
              <p>{solution.treatment}</p>
            </div>

            <div>
              <h3>🌱 {t.prevention}</h3>
              <p>{solution.prevention}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Solution;