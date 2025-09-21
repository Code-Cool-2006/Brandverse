import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginCustom from "./pages/LoginCustom";
import Lander from "./Lander";
import UserDashboard from "./pages/UserDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import PartnerDashboard from "./pages/PartnerDashboard";
import PaymentPage from "./pages/Payment";
import Chatbot from "./pages/Chatbot";

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
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </Router>
  );
}

export default App;
