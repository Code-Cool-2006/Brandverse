import React, { useState } from "react";
import "@google/model-viewer";
import "./ARModelsPage.css";

const ARModelsPage = ({ onBack }) => {
  const [selectedModel, setSelectedModel] = useState(null);

  const foodItems = [
    { name: "Indian Thali", image: "https://i.ibb.co/RpQB2J2S/Screenshot-2025-09-21-232405.png", glb: "/models/indian_thali.glb" },
    { name: "Pizza", image: "https://i.ibb.co/XxSPX1L1/Screenshot-2025-09-21-232212.png", glb: "/models/pizza.glb" },
    { name: "Indian Curry", image: "https://i.ibb.co/Hf8CKx0g/Screenshot-2025-09-21-232434.png", glb: "/models/indian_curry.glb" },
    { name: "Parleg", image: "https://i.ibb.co/7df5K2yp/Screenshot-2025-09-21-232250.png", glb: "/models/parleg.glb" },
    { name: "Biryani", image: "https://i.ibb.co/4nn7KrpJ/Screenshot-2025-09-21-232329.png", glb: "/models/biryani.glb" },
    { name: "Starbucks Coffee", image: "https://i.ibb.co/Z1bs7ctC/Screenshot-2025-09-21-232102.png", glb: "/models/coffee.glb" },
    { name: "Vada Pav", image: "https://i.ibb.co/sppwT46H/Screenshot-2025-09-21-232039.png", glb: "/models/vadapav.glb" },
  ];

  return (
    <div className="ar-page">
      <div className="header">
        <h2>🍴 3D AR Food Models</h2>
        <button className="back-btn" onClick={onBack}>
          Back to Dashboard
        </button>
      </div>

      <p>Click "View in AR" to explore food items in 3D!</p>

      <div className="food-grid">
        {foodItems.map((item, index) => (
          <div key={index} className="food-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>

            <button
              className="view-ar-btn"
              onClick={() => setSelectedModel(item)}
            >
              👓 View in AR
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedModel && (
        <div className="ar-modal">
          <div className="ar-modal-content">
            <model-viewer
              src={selectedModel.glb}
              alt={selectedModel.name}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              style={{ width: "100%", height: "500px" }}
            ></model-viewer>

            <button
              className="close-btn"
              onClick={() => setSelectedModel(null)}
            >
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARModelsPage;
