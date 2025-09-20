import React, { useState } from "react";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState({
    region: [],
    mealType: [],
    dietaryNeeds: [],
    priceRange: "",
  });

  const featuredItems = [
    {
      id: 1,
      name: "Grilled Salmon Power Bowl",
      restaurant: "Fresh Kitchen",
      image:
        "https://images.unsplash.com/photo-1621213328246-857e497f5f2a?q=80&w=2940&auto=format&fit=crop",
      price: "$$",
      isDiabetesFriendly: true,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Avocado & Egg Salad",
      restaurant: "Healthful Eats",
      image:
        "https://images.unsplash.com/photo-1621213328246-857e497f5f2a?q=80&w=2940&auto=format&fit=crop",
      price: "$",
      isDiabetesFriendly: true,
      rating: 4.5,
    },
    {
      id: 3,
      name: "Broccoli & Steak Plate",
      restaurant: "The Green Spot",
      image:
        "https://images.unsplash.com/photo-1621213328246-857e497f5f2a?q=80&w=2940&auto=format&fit=crop",
      price: "$$$",
      isDiabetesFriendly: true,
      rating: 4.9,
    },
  ];

  const menuItems = [
    {
      id: 4,
      name: "Dosa Factory",
      image:
        "https://images.unsplash.com/photo-1621213328246-857e497f5f2a?q=80&w=2940&auto=format&fit=crop",
      isDiabetesFriendly: true,
      rating: 4.6,
    },
    {
      id: 5,
      name: "Spice Garden",
      image:
        "https://images.unsplash.com/photo-1621213328246-857e497f5f2a?q=80&w=2940&auto=format&fit=crop",
      isDiabetesFriendly: true,
      rating: 4.4,
    },
    {
      id: 6,
      name: "Punjab Grill",
      image:
        "https://images.unsplash.com/photo-1621213328246-857e497f5f2a?q=80&w=2940&auto=format&fit=crop",
      isDiabetesFriendly: false,
      rating: 4.7,
    },
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (category, value) => {
    setFilter((prevFilter) => {
      const currentValues = prevFilter[category];
      if (currentValues.includes(value)) {
        return {
          ...prevFilter,
          [category]: currentValues.filter((item) => item !== value),
        };
      } else {
        return {
          ...prevFilter,
          [category]: [...currentValues, value],
        };
      }
    });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <div className="search-bar">
              <input
                type="text"
                placeholder="What would you like to eat today?"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button className="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
            <div className="recommended-section">
              <h2>Recommended for You</h2>
              <div className="recommended-list">
                {featuredItems.map((item) => (
                  <div key={item.id} className="recommended-item">
                    <img src={item.image} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="diabetes-picks-banner">
              <div className="banner-content">
                <h2>Diabetes-Friendly Picks</h2>
                <span>Low-Glycemic</span>
              </div>
            </div>
            <div className="food-list">
              {featuredItems.map((item) => (
                <div key={item.id} className="food-card">
                  <img src={item.image} alt={item.name} />
                  <div className="food-info">
                    <div className="food-details">
                      <h3>{item.name}</h3>
                      <p>{item.restaurant}</p>
                    </div>
                    <div className="food-actions">
                      <span className="price">{item.price}</span>
                      <button className="add-to-cart-btn">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case "browse":
        return (
          <>
            <div className="filters-bar">
              <div className="filter-group">
                <span>Region</span>
                {["North Indian", "South Indian", "Bengali", "Gujarati"].map(
                  (region) => (
                    <button
                      key={region}
                      className={`filter-btn ${
                        filter.region.includes(region) ? "active" : ""
                      }`}
                      onClick={() => handleFilterChange("region", region)}
                    >
                      {region}
                    </button>
                  )
                )}
              </div>
              <div className="filter-group">
                <span>Meal Type</span>
                {["Breakfast", "Lunch", "Dinner", "Snacks"].map((mealType) => (
                  <button
                    key={mealType}
                    className={`filter-btn ${
                      filter.mealType.includes(mealType) ? "active" : ""
                    }`}
                    onClick={() => handleFilterChange("mealType", mealType)}
                  >
                    {mealType}
                  </button>
                ))}
              </div>
              <div className="filter-group">
                <span>Dietary Needs</span>
                {["Diabetes-Friendly", "Spicy", "Veg/Non-Veg/Vegan"].map(
                  (need) => (
                    <button
                      key={need}
                      className={`filter-btn ${
                        filter.dietaryNeeds.includes(need) ? "active" : ""
                      }`}
                      onClick={() => handleFilterChange("dietaryNeeds", need)}
                    >
                      {need}
                    </button>
                  )
                )}
              </div>
              <div className="filter-group">
                <span>Price Range</span>
                {["$", "$$", "$$$"].map((price) => (
                  <button
                    key={price}
                    className={`filter-btn ${
                      filter.priceRange === price ? "active" : ""
                    }`}
                    onClick={() => setFilter({ ...filter, priceRange: price })}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
            <div className="menu-grid">
              {menuItems.map((item) => (
                <div key={item.id} className="menu-card">
                  <img src={item.image} alt={item.name} />
                  <div className="menu-info">
                    <h3>{item.name}</h3>
                    <div className="rating">
                      <i className="fas fa-star"></i> {item.rating}
                    </div>
                    {item.isDiabetesFriendly && (
                      <span className="diabetes-badge">Diabetes-Friendly</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        );
      case "orders":
        return <div className="placeholder">Your orders will appear here.</div>;
      case "profile":
        return <div className="placeholder">Your profile information.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <div className="logo">
          <img src="path/to/nutrieats-logo.png" alt="NutriEats Logo" />
          NutriEats
        </div>
        <nav className="nav-tabs">
          <button
            className={activeTab === "home" ? "active" : ""}
            onClick={() => setActiveTab("home")}
          >
            Home
          </button>
          <button
            className={activeTab === "browse" ? "active" : ""}
            onClick={() => setActiveTab("browse")}
          >
            Browse
          </button>
          <button
            className={activeTab === "orders" ? "active" : ""}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
          <button
            className={activeTab === "profile" ? "active" : ""}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </nav>
        <div className="user-actions">
          <i className="fas fa-bell"></i>
          <i className="fas fa-user-circle"></i>
        </div>
      </header>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default UserDashboard;
