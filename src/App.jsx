import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginCustom from "./pages/LoginCustom";
import Lander from "src/Lander.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Lander />} />
        <Route path="/lander" element={<Lander />} />
        <Route path="/login" element={<LoginCustom />} />
      </Routes>
    </Router>
  );
}

export default App;
