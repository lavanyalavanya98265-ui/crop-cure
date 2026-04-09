import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Upload from "./Upload";
import Solution from "./Solution";
import History from "./History";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/history" element={<History />} />
        <Route path="/solution" element={<Solution />} /> {/* 🔥 THIS */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;