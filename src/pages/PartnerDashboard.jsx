import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "./PartnerDashboard.css";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Delivery agent custom icon
const deliveryIcon = L.divIcon({
  html: '<div style="font-size: 30px;">🛵</div>',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  className: "biker-marker",
});

// Decode polyline string
function decodePolyline(str, precision) {
  let index = 0,
    lat = 0,
    lng = 0,
    coordinates = [];
  const factor = Math.pow(10, precision || 5);

  while (index < str.length) {
    let shift = 0,
      result = 0,
      byte = null;
    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let dlat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      byte = str.charCodeAt(index++) - 63;
      result |= (byte & 0x1f) << shift;
      shift += 5;
    } while (byte >= 0x20);

    let dlng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    coordinates.push([lat / factor, lng / factor]);
  }
  return coordinates.map((c) => ({ lat: c[0], lng: c[1] }));
}

// ➡ Utility: Haversine distance in km
function getDistanceKm(coord1, coord2) {
  const R = 6371;
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c).toFixed(2);
}

// Orders in Belagavi
const availableOrders = [
  {
    id: 1,
    name: "Shivaji Garden Order",
    pickup: { lat: 15.8647, lng: 74.5208 },
    destination: { lat: 15.8569, lng: 74.5097 },
  },
];

function PartnerDashboard() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [agentPosition, setAgentPosition] = useState({
    lat: 15.8647,
    lng: 74.5208,
  });
  const [step, setStep] = useState("list"); // list | map | success
  const [routePoints, setRoutePoints] = useState([]);
  const [showCompletionButton, setShowCompletionButton] = useState(false);
  const [deliveryHistory, setDeliveryHistory] = useState([]);
  const routeIndex = useRef(0);
  const animationRef = useRef(null);

  // Animate delivery agent
  useEffect(() => {
    if (!selectedOrder || routePoints.length === 0) return;

    routeIndex.current = 0;
    const totalDuration = 10000; // 10s
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed >= totalDuration) {
        setAgentPosition(routePoints[routePoints.length - 1]);
        setShowCompletionButton(true);
        cancelAnimationFrame(animationRef.current);
        return;
      }

      const progress = elapsed / totalDuration;
      const totalDistance = routePoints.reduce((acc, p, i, arr) => {
        if (i === 0) return 0;
        const prev = arr[i - 1];
        return acc + Math.hypot(p.lat - prev.lat, p.lng - prev.lng);
      }, 0);

      let currentDist = totalDistance * progress;
      let cumDist = 0;

      for (let i = 1; i < routePoints.length; i++) {
        const prev = routePoints[i - 1];
        const curr = routePoints[i];
        const segDist = Math.hypot(curr.lat - prev.lat, curr.lng - prev.lng);

        if (cumDist + segDist >= currentDist) {
          const segProgress = (currentDist - cumDist) / segDist;
          setAgentPosition({
            lat: prev.lat + (curr.lat - prev.lat) * segProgress,
            lng: prev.lng + (curr.lng - prev.lng) * segProgress,
          });
          break;
        }
        cumDist += segDist;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [selectedOrder, routePoints]);

  // Fetch route
  const getRoute = async (start, end) => {
    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=polyline`
      );
      const data = await res.json();
      if (data.routes?.length) {
        const decoded = decodePolyline(data.routes[0].geometry, 5);
        setRoutePoints(decoded);
        return decoded;
      }
      return [];
    } catch (err) {
      console.error("Route error:", err);
      return [];
    }
  };

  const handleAccept = async (order) => {
    setSelectedOrder(order);
    setStep("map");
    setShowCompletionButton(false);
    const newRoute = await getRoute(order.pickup, order.destination);
    if (newRoute.length) setAgentPosition(newRoute[0]);
  };

  const handleCompleteDelivery = () => {
    setStep("success");
    setDeliveryHistory((prev) => [
      ...prev,
      { ...selectedOrder, time: new Date().toLocaleString() },
    ]);
  };

  return (
    <div className="dashboard-container">
      <div className="lander-navbar-brand">Delivery Agent Dashboard</div>

      <div className="main-content">
        <div className="orders-section">
          {step === "list" && (
            <div className="order-list">
              <h2>Available Orders</h2>
              {availableOrders.map((order) => {
                const distanceKm = getDistanceKm(
                  order.pickup,
                  order.destination
                );
                return (
                  <div key={order.id} className="order-card">
                    <p>
                      <strong>{order.name}</strong>
                    </p>
                    <p>
                      Pickup: ({order.pickup.lat}, {order.pickup.lng})
                    </p>
                    <p>
                      Destination: ({order.destination.lat},{" "}
                      {order.destination.lng})
                    </p>
                    <p>Distance: {distanceKm} km</p>
                    <button onClick={() => handleAccept(order)}>Accept</button>
                  </div>
                );
              })}
            </div>
          )}

          {step === "map" && selectedOrder && (
            <div className="delivery-card">
              <h2>Delivering: {selectedOrder.name}</h2>
              <p>Status: On the way</p>
              <p>
                Distance:{" "}
                {getDistanceKm(selectedOrder.pickup, selectedOrder.destination)}{" "}
                km
              </p>
              <div className="map-container">
                <MapContainer
                  center={agentPosition}
                  zoom={15}
                  style={{ width: "100%", height: "400px" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
                  />
                  <Marker position={agentPosition} icon={deliveryIcon}></Marker>
                  <Marker position={selectedOrder.destination}></Marker>
                  {routePoints.length > 0 && (
                    <Polyline
                      positions={routePoints}
                      color="blue"
                      weight={5}
                      opacity={0.7}
                    />
                  )}
                  <FlyToMarker position={agentPosition} />
                </MapContainer>
              </div>
              {showCompletionButton && (
                <div style={{ marginTop: "1rem" }}>
                  <button onClick={handleCompleteDelivery}>
                    Complete Delivery
                  </button>
                </div>
              )}
            </div>
          )}

          {step === "success" && selectedOrder && (
            <div className="success-page">
              <h2>✅ Delivery Completed!</h2>
              <p>
                Order <strong>{selectedOrder.name}</strong> has been delivered
                successfully.
              </p>
              <p>Completed at: {new Date().toLocaleString()}</p>
              <button
                onClick={() => {
                  setSelectedOrder(null);
                  setStep("list");
                }}
              >
                Back to Orders
              </button>
            </div>
          )}
        </div>

        {/* Delivery History Sidebar */}
        <div className="history-section">
          <h3>Delivery History</h3>
          {deliveryHistory.length === 0 ? (
            <p>No deliveries yet.</p>
          ) : (
            <ul>
              {deliveryHistory.map((order, i) => (
                <li key={i}>
                  <strong>{order.name}</strong> <br />
                  Completed at: {order.time}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

// Pan map smoothly
function FlyToMarker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.panTo(position, { animate: true, duration: 0.5 });
  }, [position, map]);
  return null;
}

export default PartnerDashboard;
