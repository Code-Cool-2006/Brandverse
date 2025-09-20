import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginCustom from "./pages/LoginCustom";
import Lander from "./Lander";
import UserDashboard from "./pages/UserDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Lander />} />
        <Route path="/lander" element={<Lander />} />

        {/* Login Page */}
        <Route path="/logincustom" element={<LoginCustom />} />

        {/* Dashboards */}
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/partner-dashboard" element={<PartnerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
