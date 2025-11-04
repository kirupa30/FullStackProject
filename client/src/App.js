import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import History from "./pages/History"; // <-- ADD THIS IMPORT

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} /> {/* <-- ADD THIS ROUTE */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
