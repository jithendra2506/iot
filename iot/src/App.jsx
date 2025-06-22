import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DeviceDataPage from "./pages/DeviceDataPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard"; // <-- Make sure this path matches your file location

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/devices" element={<DeviceDataPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} /> {/* Admin route */}
      </Routes>
    </Router>
  );
}

export default App;