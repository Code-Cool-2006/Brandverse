import React, { useState, useEffect } from "react";
import "./StaffDashboard.css";
import Grocery from "./Grocery";

// Add Font Awesome CDN link in the head
const fontAwesomeCDN = document.createElement("link");
fontAwesomeCDN.rel = "stylesheet";
fontAwesomeCDN.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
document.head.appendChild(fontAwesomeCDN);

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [managementSubTab, setManagementSubTab] = useState("customers");
  const [grocerySubTab, setGrocerySubTab] = useState("inventory");
  const [restaurants, setRestaurants] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "restaurant",
    category: "multi",
    image: "",
  });
  const [error, setError] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [selectedRestaurantName, setSelectedRestaurantName] = useState("");
  const [dishesByRestaurant, setDishesByRestaurant] = useState({});
  const [dishForm, setDishForm] = useState({
    name: "",
    price: "",
    image: "",
    category: "veg",
    diabeticFriendly: false,
  });
  const [creatingDish, setCreatingDish] = useState(false);
  const [dishesLoading, setDishesLoading] = useState(false);

  // Sample data for demonstration
  const overviewStats = {
    orders: { count: 247, change: "+12%" },
    customers: { count: 1234, change: "+8%" },
    revenue: { count: 15420, change: "+15%" },
  };

  const fetchDishes = async (restaurantId) => {
    try {
      setDishesLoading(true);
      const res = await fetch(
        `http://localhost:5000/api/restaurants/${restaurantId}/dishes`
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        let message = `Failed to load dishes for restaurant ${restaurantId}`;
        try {
          const json = JSON.parse(text);
          message = json.message || message;
        } catch (_) {
          if (!text) message = `HTTP ${res.status}`;
        }
        setError(message);
        setDishesByRestaurant((prev) => ({ ...prev, [restaurantId]: [] }));
        return;
      }
      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { dishes: [] };
      setDishesByRestaurant((prev) => ({
        ...prev,
        [restaurantId]: data.dishes || [],
      }));
    } catch (e) {
      console.error(e);
      setError(
        `Failed to load dishes for restaurant ${restaurantId}. Is the server running on http://localhost:5000?`
      );
    } finally {
      setDishesLoading(false);
    }
  };

  const handleSelectRestaurant = async (rid) => {
    setError("");
    setSelectedRestaurantId((prev) => {
      const nextId = prev === rid ? null : rid;
      const name = restaurants.find((r) => r.id === rid)?.name || "";
      setSelectedRestaurantName(nextId ? name : "");
      return nextId;
    });
    // Fetch dishes immediately for the clicked restaurant (avoid stale state issue)
    await fetchDishes(rid);
  };

  const handleCreateDish = async (e) => {
    e.preventDefault();
    setError("");
    if (!selectedRestaurantId) {
      setError(
        "Please select a restaurant from the list above before adding a dish."
      );
      return;
    }
    // Resolve the current restaurant; if ID is stale (server restarted), try by name after a refresh
    let current =
      restaurants.find((r) => r.id === selectedRestaurantId) ||
      (selectedRestaurantName
        ? restaurants.find((r) => r.name === selectedRestaurantName)
        : null);
    if (!current) {
      const freshList = await fetchRestaurants();
      current =
        freshList.find((r) => r.id === selectedRestaurantId) ||
        (selectedRestaurantName
          ? freshList.find((r) => r.name === selectedRestaurantName)
          : null);
      if (!current) {
        setSelectedRestaurantId(null);
        setSelectedRestaurantName("");
        setError(
          "Selected restaurant no longer exists on the server. Please reselect a restaurant and try again."
        );
        return;
      }
      // Update to the new ID if matched by name
      if (current.id !== selectedRestaurantId) {
        setSelectedRestaurantId(current.id);
      }
    }
    if (!dishForm.name.trim() || !dishForm.price) {
      setError("Dish name and price are required");
      return;
    }
    try {
      setCreatingDish(true);
      const payload = { ...dishForm, price: parseFloat(dishForm.price) };
      const res = await fetch(
        `http://localhost:5000/api/restaurants/${current.id}/dishes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        let message = "Failed to create dish";
        try {
          const json = JSON.parse(text);
          message = json.message || message;
        } catch (_) {
          if (res.status === 404) {
            message =
              "Restaurant not found on server. Try refreshing the restaurants list or re-create the restaurant (server may have restarted).";
          } else if (!text) {
            message = `HTTP ${res.status}`;
          }
        }
        throw new Error(message);
      }
      const body = await res.json();
      const created = body?.dish;
      setDishForm({
        name: "",
        price: "",
        image: "",
        category: "veg",
        diabeticFriendly: false,
      });
      // Optimistically update dishes state to avoid waiting for a refetch
      if (created) {
        setDishesByRestaurant((prev) => ({
          ...prev,
          [current.id]: [...(prev[current.id] || []), created],
        }));
      } else {
        await fetchDishes(current.id);
      }
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to create dish");
    } finally {
      setCreatingDish(false);
    }
  };

  const recentOrders = [
    {
      id: "#1234",
      customer: "John Doe",
      restaurant: "Fresh Kitchen",
      items: "Grilled Salmon Bowl, Avocado Salad",
      total: "$24.50",
      status: "confirmed",
      time: "2 mins ago",
    },
    {
      id: "#1235",
      customer: "Sarah Wilson",
      restaurant: "Healthful Eats",
      items: "Quinoa Bowl, Green Smoothie",
      total: "$18.75",
      status: "preparing",
      time: "5 mins ago",
    },
    {
      id: "#1236",
      customer: "Mike Johnson",
      restaurant: "The Green Spot",
      items: "Broccoli Steak, Kale Salad",
      total: "$32.00",
      status: "pending",
      time: "8 mins ago",
    },
  ];

  // Fetch restaurants when switching to Management > Restaurants
  useEffect(() => {
    if (activeTab === "management" && managementSubTab === "restaurants") {
      fetchRestaurants();
    }
  }, [activeTab, managementSubTab]);

  const fetchRestaurants = async () => {
    try {
      setError("");
      const res = await fetch("http://localhost:5000/api/restaurants");
      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json")
        ? await res.json()
        : { restaurants: [] };
      const list = Array.isArray(data.restaurants) ? data.restaurants : [];
      setRestaurants(list);
      if (
        selectedRestaurantId &&
        !list.some((r) => r.id === selectedRestaurantId)
      ) {
        // Try to preserve selection by name if IDs changed after server restart
        if (selectedRestaurantName) {
          const byName = list.find((r) => r.name === selectedRestaurantName);
          if (byName) {
            setSelectedRestaurantId(byName.id);
            // Also refresh dishes for the reselected restaurant
            fetchDishes(byName.id);
          } else {
            setSelectedRestaurantId(null);
          }
        } else {
          setSelectedRestaurantId(null);
        }
      }
      return list;
    } catch (e) {
      console.error(e);
      setError("Failed to load restaurants");
      return [];
    }
  };

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    try {
      setCreating(true);
      setError("");
      const res = await fetch("http://localhost:5000/api/restaurants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const msg = await res.json().catch(() => ({ message: "Error" }));
        throw new Error(msg.message || "Failed to create restaurant");
      }
      setForm({ name: "", type: "restaurant", category: "multi", image: "" });
      await fetchRestaurants();
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to create restaurant");
    } finally {
      setCreating(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            {/* Overview Cards */}
            <div className="overview-grid">
              <div className="overview-card orders">
                <div className="overview-card-icon">
                  <i className="fas fa-shopping-bag"></i>
                </div>
                <h3>{overviewStats.orders.count}</h3>
                <p>Today's Orders</p>
                <span style={{ color: "#4caf50", fontSize: "12px" }}>
                  {overviewStats.orders.change} from yesterday
                </span>
              </div>
              <div className="overview-card customers">
                <div className="overview-card-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3>{overviewStats.customers.count.toLocaleString()}</h3>
                <p>Total Customers</p>
                <span style={{ color: "#4caf50", fontSize: "12px" }}>
                  {overviewStats.customers.change} from last month
                </span>
              </div>
              <div className="overview-card revenue">
                <div className="overview-card-icon">
                  <i className="fas fa-dollar-sign"></i>
                </div>
                <h3>${overviewStats.revenue.count.toLocaleString()}</h3>
                <p>Today's Revenue</p>
                <span style={{ color: "#4caf50", fontSize: "12px" }}>
                  {overviewStats.revenue.change} from yesterday
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <button className="action-btn">
                  <i className="fas fa-plus"></i>
                  New Order
                </button>
                <button className="action-btn">
                  <i className="fas fa-user-plus"></i>
                  Add Customer
                </button>
                <button className="action-btn">
                  <i className="fas fa-utensils"></i>
                  Add Restaurant
                </button>
                <button className="action-btn">
                  <i className="fas fa-chart-bar"></i>
                  View Reports
                </button>
              </div>
            </div>

            {/* Recent Orders */}
            <div className="recent-orders">
              <h2>Recent Orders</h2>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Restaurant</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.restaurant}</td>
                      <td>{order.items}</td>
                      <td>{order.total}</td>
                      <td>
                        <span className={`status-badge status-${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{order.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        );

      case "orders":
        return (
          <div className="management-section">
            <h2>Order Management</h2>
            <div className="management-grid">
              <div className="management-card">
                <h3>Pending Orders</h3>
                <p>Orders waiting for confirmation</p>
                <button className="manage-btn">View All</button>
              </div>
              <div className="management-card">
                <h3>Preparing Orders</h3>
                <p>Orders currently being prepared</p>
                <button className="manage-btn">View All</button>
              </div>
              <div className="management-card">
                <h3>Ready for Delivery</h3>
                <p>Orders ready for pickup</p>
                <button className="manage-btn">View All</button>
              </div>
              <div className="management-card">
                <h3>Delivered Orders</h3>
                <p>Successfully delivered orders</p>
                <button className="manage-btn">View All</button>
              </div>
            </div>
          </div>
        );

      case "grocery":
        return <Grocery />;

      case "management":
        return (
          <div className="management-section">
            <h2>Management</h2>

            {/* Sub-tabs for Customers and Restaurants */}
            <div className="management-sub-tabs">
              <button
                className={managementSubTab === "customers" ? "active" : ""}
                onClick={() => setManagementSubTab("customers")}
              >
                Customers
              </button>
              <button
                className={managementSubTab === "restaurants" ? "active" : ""}
                onClick={() => setManagementSubTab("restaurants")}
              >
                Restaurants
              </button>
            </div>

            {managementSubTab === "customers" && (
              <div className="management-grid">
                <div className="management-card">
                  <h3>Customer Support</h3>
                  <p>Handle customer inquiries and issues</p>
                  <button className="manage-btn">Support Center</button>
                </div>
                <div className="management-card">
                  <h3>Customer Database</h3>
                  <p>View and manage customer information</p>
                  <button className="manage-btn">View Database</button>
                </div>
                <div className="management-card">
                  <h3>Feedback & Reviews</h3>
                  <p>Monitor customer feedback</p>
                  <button className="manage-btn">View Reviews</button>
                </div>
                <div className="management-card">
                  <h3>Loyalty Program</h3>
                  <p>Manage customer rewards</p>
                  <button className="manage-btn">Manage Program</button>
                </div>
              </div>
            )}

            {managementSubTab === "restaurants" && (
              <div className="management-grid restaurants-grid">
                <div
                  className="management-card"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <h3>Add New Restaurant</h3>
                  <p>Onboard new restaurant partners</p>
                  {error && <div className="error-banner">{error}</div>}
                  <form
                    className="restaurant-form"
                    onSubmit={handleCreateRestaurant}
                  >
                    <div className="form-row">
                      <label>Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="e.g., Healthy Haven"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <label>Type</label>
                      <select
                        value={form.type}
                        onChange={(e) =>
                          setForm({ ...form, type: e.target.value })
                        }
                      >
                        <option value="restaurant">Restaurant</option>
                        <option value="cafe">Cafe</option>
                      </select>
                    </div>
                    <div className="form-row">
                      <label>Category</label>
                      <input
                        type="text"
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                        placeholder="veg | non-veg | multi | indian"
                      />
                    </div>
                    <div className="form-row">
                      <label>Image URL</label>
                      <input
                        type="url"
                        value={form.image}
                        onChange={(e) =>
                          setForm({ ...form, image: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>
                    <button
                      className="manage-btn"
                      type="submit"
                      disabled={creating}
                    >
                      {creating ? "Adding..." : "Add Restaurant"}
                    </button>
                  </form>
                </div>

                <div
                  className="management-card"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3>Partner Restaurants ({restaurants.length})</h3>
                    <button
                      className="manage-btn"
                      style={{ maxWidth: 140 }}
                      onClick={fetchRestaurants}
                    >
                      Refresh
                    </button>
                  </div>
                  <p>Manage restaurant partnerships</p>
                  <div className="restaurants-list">
                    {restaurants.map((r) => (
                      <div
                        key={r.id}
                        className={`restaurant-row ${
                          selectedRestaurantId === r.id ? "selected" : ""
                        }`}
                        onClick={() => handleSelectRestaurant(r.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={
                            r.image ||
                            "https://via.placeholder.com/60x40?text=Img"
                          }
                          alt={r.name}
                        />
                        <div className="restaurant-info">
                          <div className="restaurant-name">{r.name}</div>
                          <div className="restaurant-meta">
                            {r.type} • {r.category}
                          </div>
                        </div>
                      </div>
                    ))}
                    {restaurants.length === 0 && (
                      <div>No restaurants yet. Add your first one above.</div>
                    )}
                  </div>
                </div>

                {selectedRestaurantId && (
                  <div
                    className="management-card"
                    style={{ gridColumn: "1 / -1" }}
                  >
                    <h3>Manage Dishes</h3>
                    <p style={{ fontWeight: 600 }}>
                      Selected:{" "}
                      {restaurants.find((r) => r.id === selectedRestaurantId)
                        ?.name ||
                        selectedRestaurantName ||
                        (selectedRestaurantId
                          ? `#${selectedRestaurantId}`
                          : "None")}
                    </p>
                    <p>Add dishes for the selected restaurant</p>
                    {error && <div className="error-banner">{error}</div>}
                    <form
                      className="restaurant-form"
                      onSubmit={handleCreateDish}
                    >
                      <div className="form-row">
                        <label>Dish Name</label>
                        <input
                          type="text"
                          value={dishForm.name}
                          onChange={(e) =>
                            setDishForm({ ...dishForm, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-row">
                        <label>Price</label>
                        <input
                          type="number"
                          step="0.01"
                          value={dishForm.price}
                          onChange={(e) =>
                            setDishForm({ ...dishForm, price: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-row">
                        <label>Image URL</label>
                        <input
                          type="url"
                          value={dishForm.image}
                          onChange={(e) =>
                            setDishForm({ ...dishForm, image: e.target.value })
                          }
                          placeholder="https://..."
                        />
                      </div>
                      <div className="form-row">
                        <label>Category</label>
                        <input
                          type="text"
                          value={dishForm.category}
                          onChange={(e) =>
                            setDishForm({
                              ...dishForm,
                              category: e.target.value,
                            })
                          }
                          placeholder="veg | non-veg | multi"
                        />
                      </div>
                      <div
                        className="form-row"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <input
                          id="diabeticFriendly"
                          type="checkbox"
                          checked={dishForm.diabeticFriendly}
                          onChange={(e) =>
                            setDishForm({
                              ...dishForm,
                              diabeticFriendly: e.target.checked,
                            })
                          }
                        />
                        <label htmlFor="diabeticFriendly">
                          Diabetes-friendly
                        </label>
                      </div>
                      <button
                        className="manage-btn"
                        type="submit"
                        disabled={creatingDish}
                      >
                        {creatingDish ? "Adding..." : "Add Dish"}
                      </button>
                    </form>

                    <h4 style={{ marginTop: "20px" }}>Existing Dishes</h4>
                    <div className="restaurants-list">
                      {(dishesByRestaurant[selectedRestaurantId] || []).map(
                        (d) => (
                          <div key={d.id} className="restaurant-row">
                            <img
                              src={
                                d.image ||
                                "https://via.placeholder.com/60x40?text=Img"
                              }
                              alt={d.name}
                            />
                            <div className="restaurant-info">
                              <div className="restaurant-name">
                                {d.name} - ${d.price.toFixed(2)}
                              </div>
                              <div className="restaurant-meta">
                                {d.category}
                                {d.diabeticFriendly
                                  ? " • diabetes-friendly"
                                  : ""}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      {(dishesByRestaurant[selectedRestaurantId] || [])
                        .length === 0 && <div>No dishes yet.</div>}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
      case "management":
        return (
          <div className="management-section">
            <h2>Management</h2>

            {/* Sub-tabs for Customers and Restaurants */}
            <div className="management-sub-tabs">
              <button
                className={managementSubTab === "customers" ? "active" : ""}
                onClick={() => setManagementSubTab("customers")}
              >
                Customers
              </button>
              <button
                className={managementSubTab === "restaurants" ? "active" : ""}
                onClick={() => setManagementSubTab("restaurants")}
              >
                Restaurants
              </button>
            </div>

            {managementSubTab === "customers" && (
              <div className="management-grid">
                <div className="management-card">
                  <h3>Customer Support</h3>
                  <p>Handle customer inquiries and issues</p>
                  <button className="manage-btn">Support Center</button>
                </div>
                <div className="management-card">
                  <h3>Customer Database</h3>
                  <p>View and manage customer information</p>
                  <button className="manage-btn">View Database</button>
                </div>
                <div className="management-card">
                  <h3>Feedback & Reviews</h3>
                  <p>Monitor customer feedback</p>
                  <button className="manage-btn">View Reviews</button>
                </div>
                <div className="management-card">
                  <h3>Loyalty Program</h3>
                  <p>Manage customer rewards</p>
                  <button className="manage-btn">Manage Program</button>
                </div>
              </div>
            )}

            {managementSubTab === "restaurants" && (
              <div className="management-grid restaurants-grid">
                <div
                  className="management-card"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <h3>Add New Restaurant</h3>
                  <p>Onboard new restaurant partners</p>
                  {error && <div className="error-banner">{error}</div>}
                  <form
                    className="restaurant-form"
                    onSubmit={handleCreateRestaurant}
                  >
                    <div className="form-row">
                      <label>Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="e.g., Healthy Haven"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <label>Type</label>
                      <select
                        value={form.type}
                        onChange={(e) =>
                          setForm({ ...form, type: e.target.value })
                        }
                      >
                        <option value="restaurant">Restaurant</option>
                        <option value="cafe">Cafe</option>
                      </select>
                    </div>
                    <div className="form-row">
                      <label>Category</label>
                      <input
                        type="text"
                        value={form.category}
                        onChange={(e) =>
                          setForm({ ...form, category: e.target.value })
                        }
                        placeholder="veg | non-veg | multi | indian"
                      />
                    </div>
                    <div className="form-row">
                      <label>Image URL</label>
                      <input
                        type="url"
                        value={form.image}
                        onChange={(e) =>
                          setForm({ ...form, image: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </div>
                    <button
                      className="manage-btn"
                      type="submit"
                      disabled={creating}
                    >
                      {creating ? "Adding..." : "Add Restaurant"}
                    </button>
                  </form>
                </div>

                <div
                  className="management-card"
                  style={{ gridColumn: "1 / -1" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h3>Partner Restaurants ({restaurants.length})</h3>
                    <button
                      className="manage-btn"
                      style={{ maxWidth: 140 }}
                      onClick={fetchRestaurants}
                    >
                      Refresh
                    </button>
                  </div>
                  <p>Manage restaurant partnerships</p>
                  <div className="restaurants-list">
                    {restaurants.map((r) => (
                      <div
                        key={r.id}
                        className={`restaurant-row ${
                          selectedRestaurantId === r.id ? "selected" : ""
                        }`}
                        onClick={() => handleSelectRestaurant(r.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={
                            r.image ||
                            "https://via.placeholder.com/60x40?text=Img"
                          }
                          alt={r.name}
                        />
                        <div className="restaurant-info">
                          <div className="restaurant-name">{r.name}</div>
                          <div className="restaurant-meta">
                            {r.type} • {r.category}
                          </div>
                        </div>
                      </div>
                    ))}
                    {restaurants.length === 0 && (
                      <div>No restaurants yet. Add your first one above.</div>
                    )}
                  </div>
                </div>

                {selectedRestaurantId && (
                  <div
                    className="management-card"
                    style={{ gridColumn: "1 / -1" }}
                  >
                    <h3>Manage Dishes</h3>
                    <p style={{ fontWeight: 600 }}>
                      Selected:{" "}
                      {restaurants.find((r) => r.id === selectedRestaurantId)
                        ?.name ||
                        selectedRestaurantName ||
                        (selectedRestaurantId
                          ? `#${selectedRestaurantId}`
                          : "None")}
                    </p>
                    <p>Add dishes for the selected restaurant</p>
                    {error && <div className="error-banner">{error}</div>}
                    <form
                      className="restaurant-form"
                      onSubmit={handleCreateDish}
                    >
                      <div className="form-row">
                        <label>Dish Name</label>
                        <input
                          type="text"
                          value={dishForm.name}
                          onChange={(e) =>
                            setDishForm({ ...dishForm, name: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-row">
                        <label>Price</label>
                        <input
                          type="number"
                          step="0.01"
                          value={dishForm.price}
                          onChange={(e) =>
                            setDishForm({ ...dishForm, price: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="form-row">
                        <label>Image URL</label>
                        <input
                          type="url"
                          value={dishForm.image}
                          onChange={(e) =>
                            setDishForm({ ...dishForm, image: e.target.value })
                          }
                          placeholder="https://..."
                        />
                      </div>
                      <div className="form-row">
                        <label>Category</label>
                        <input
                          type="text"
                          value={dishForm.category}
                          onChange={(e) =>
                            setDishForm({
                              ...dishForm,
                              category: e.target.value,
                            })
                          }
                          placeholder="veg | non-veg | multi"
                        />
                      </div>
                      <div
                        className="form-row"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <input
                          id="diabeticFriendly"
                          type="checkbox"
                          checked={dishForm.diabeticFriendly}
                          onChange={(e) =>
                            setDishForm({
                              ...dishForm,
                              diabeticFriendly: e.target.checked,
                            })
                          }
                        />
                        <label htmlFor="diabeticFriendly">
                          Diabetes-friendly
                        </label>
                      </div>
                      <button
                        className="manage-btn"
                        type="submit"
                        disabled={creatingDish}
                      >
                        {creatingDish ? "Adding..." : "Add Dish"}
                      </button>
                    </form>

                    <h4 style={{ marginTop: "20px" }}>Existing Dishes</h4>
                    <div className="restaurants-list">
                      {(dishesByRestaurant[selectedRestaurantId] || []).map(
                        (d) => (
                          <div key={d.id} className="restaurant-row">
                            <img
                              src={
                                d.image ||
                                "https://via.placeholder.com/60x40?text=Img"
                              }
                              alt={d.name}
                            />
                            <div className="restaurant-info">
                              <div className="restaurant-name">
                                {d.name} - ${d.price.toFixed(2)}
                              </div>
                              <div className="restaurant-meta">
                                {d.category}
                                {d.diabeticFriendly
                                  ? " • diabetes-friendly"
                                  : ""}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      {(dishesByRestaurant[selectedRestaurantId] || [])
                        .length === 0 && <div>No dishes yet.</div>}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );

        return null;
    }
  };

  return (
    <div className="staff-dashboard-container">
      <header className="staff-header">
        <div className="staff-logo">
          <div className="staff-logo-icon">👨‍🍳</div>
          TomatoVerse Staff
        </div>
        <nav className="staff-nav-tabs">
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={activeTab === "grocery" ? "active" : ""}
            onClick={() => setActiveTab("grocery")}
          >
            Grocery
          </button>
          <button
            className={activeTab === "management" ? "active" : ""}
            onClick={() => setActiveTab("management")}
          >
            Management
          </button>
        </nav>
        <div className="staff-user-actions">
          <i className="fas fa-bell"></i>
          <i className="fas fa-user-circle"></i>
        </div>
      </header>
      <main className="staff-main-content">{renderContent()}</main>
    </div>
  );
};

export default StaffDashboard;
