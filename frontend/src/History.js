import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(stored);
  }, []);

  return (
    <div
      style={{
        padding: "30px",
        textAlign: "center",
        background: "linear-gradient(to right, #66bb6a, #a5d6a7)",
        minHeight: "100vh",
      }}
    >
      <h1>📜 Scan History</h1>

      {history.length === 0 ? (
        <p>No history available</p>
      ) : (
        history.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              navigate("/solution", { state: { result: item } })
            }
            style={{
              background: "#fff",
              margin: "15px auto",
              padding: "20px",
              width: "400px",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            <h3>{item.disease}</h3>
            <p><strong>Confidence:</strong> {item.confidence}%</p>
            <p style={{ fontSize: "12px", color: "gray" }}>{item.time}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default History;