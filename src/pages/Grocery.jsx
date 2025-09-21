import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Grocery.css";

// --- Comprehensive Dummy Data for Groceries (with corrected categories) ---
const groceryData = {
  categories: [
    { id: "fresh", name: "Fresh Corner" },
    { id: "snacks", name: "Groceries" },
    { id: "juices", name: "Juices & Drinks" },
    { id: "dairy", name: "Dairy & Bread" },
    { id: "cleaning", name: "Cleaning Essentials" },
  ],
  items: [
    // Fresh Corner
    {
      id: 101,
      category: "fresh",
      name: "Fresh Onions",
      price: 30,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLOZMdGC6UuMJiIDE__sDw_XbdKj9rdkeGdA&s",
      unit: "1 kg",
    },
    {
      id: 102,
      category: "fresh",
      name: "Ripe Tomatoes",
      price: 45,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpgA44UvvwXsoOCvzVGsLFs854Lrt38WUqyQ&s",
      unit: "1 kg",
    },
    {
      id: 103,
      category: "fresh",
      name: "Fresh Apples",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=2070&auto=format&fit=crop",
      unit: "1 kg",
    },
    {
      id: 104,
      category: "fresh",
      name: "Bananas",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2070&auto=format&fit=crop",
      unit: "1 dozen",
    },

    // Snacks (Corrected from "groceries")
    {
      id: 202,
      category: "snacks",
      name: "Oil",
      price: 20,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg1a04uSAm2G011-q2_HwZPJojI-z8DQQ85w&s",
      unit: "1 L",
    },
    {
      id: 203,
      category: "snacks",
      name: "Aashirvad Rava",
      price: 10,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxprnC1YfAvt4KAFykGMcbNGIQAT0e7SzSNQ&s",
      unit: "500 g",
    },
    {
      id: 204,
      category: "snacks",
      name: "Vijay Gold Avalaki Poha",
      price: 10,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7FF1HQ8eCkIrqhZ3GfRh7DFRjCWtg7NtLRA&s",
      unit: "500 g",
    },
    {
      id: 205,
      category: "snacks",
      name: "Fortune Maida",
      price: 40,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDvPQx3jR68KTASpuDgW54Vvkl6riRFKnzGA&s",
      unit: "500 g",
    },
    {
      id: 206,
      category: "snacks",
      name: "Wheat Flour",
      price: 55,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHrKWbrOkWin9NIdrs4Tjn9gzAnAV3XAKX1g&s",
      unit: "3 kg",
    },
    {
      id: 207,
      category: "snacks",
      name: "Rice",
      price: 60,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0u3HZo9Ct4jxnTKhsk2Gtc3whbo5zaIeCnw&s",
      unit: "1 kg",
    },

    // Juices
    {
      id: 301,
      category: "juices",
      name: "Appy Fizz",
      price: 40,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjGsaK-VWWGXo-yipDd7iefgJlGcS29_huHw&s",
      unit: "250 ml",
    },
    {
      id: 302,
      category: "juices",
      name: "Maaza Mango Drink",
      price: 75,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgQCHLOzGtou5Uchg9n3kyVShrH4iYW2-e8w&s",
      unit: "1.2 L",
    },
    {
      id: 303,
      category: "juices",
      name: "Tropicana 100% Orange Juice",
      price: 135,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40020129_8-tropicana-orange-juice.jpg",
      unit: "1 L",
    },
    
    // Dairy
    {
      id: 401,
      category: "dairy",
      name: "Amul Gold Milk",
      price: 30,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaEAfP6cd5fnOfZCDv_DS-slfV1uShiPyIEw&s",
      unit: "500 ml",
    },
    {
      id: 402,
      category: "dairy",
      name: "Britannia Brown Bread",
      price: 50,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLgR_wmCMq8zT0gAWAvHH-vjy_008psEErmw&s",
      unit: "400 g",
    },

    // Cleaning
    {
      id: 501,
      category: "cleaning",
      name: "Harpic Powerplus Toilet Cleaner",
      price: 95,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJnhFCQZnGQscfHcT-KiUccgc4mzQAA66x2g&s",
      unit: "500 ml",
    },
    {
      id: 502,
      category: "cleaning",
      name: "Surf Excel Matic Liquid Detergent",
      price: 240,
      image:
        "https://m.media-amazon.com/images/I/51b7Ak1l9GL._UF1000,1000_QL80_.jpg",
      unit: "1 L",
    },
  ],
};

export default function Grocery() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("fresh");
  const [cart, setCart] = useState([]);
  const categoryRefs = useRef({});

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    categoryRefs.current[categoryId]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const handleQuantityChange = (itemId, amount) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
      if (existingItem.quantity + amount === 0) {
        return prevCart.filter((cartItem) => cartItem.id !== itemId);
      }
      return prevCart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + amount }
          : cartItem
      );
    });
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleCheckout = () => {
    navigate("/payment", { state: { totalAmount: cartTotal } });
  };

  return (
    <div className="grocery-container">
      <aside className="category-sidebar">
        <h2 className="sidebar-title">Categories</h2>
        <ul>
          {groceryData.categories.map((cat) => (
            <li key={cat.id}>
              <a
                href={`#${cat.id}`}
                className={`category-link ${
                  activeCategory === cat.id ? "active" : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick(cat.id);
                }}
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <main className="product-main">
        <header className="grocery-header">
          <h1>InstaGrocery</h1>
          <p>Groceries delivered in minutes!</p>
        </header>

        <div className="marketing-banner">
          <h2>Farm-Fresh in 10 Mins!</h2>
          <p>
            Unbeatable prices on the freshest fruits & vegetables, delivered at
            rocket speed.
          </p>
        </div>

        <div className="product-listings">
          {groceryData.categories.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              ref={(el) => (categoryRefs.current[cat.id] = el)}
            >
              <h2 className="category-title">{cat.name}</h2>
              <div className="product-grid">
                {groceryData.items
                  .filter((item) => item.category === cat.id)
                  .map((item) => {
                    const cartItem = cart.find((ci) => ci.id === item.id);
                    return (
                      <div className="product-card" key={item.id}>
                        <div className="product-image-container">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="product-details">
                          <p className="product-price">₹{item.price}</p>
                          <h3 className="product-name">{item.name}</h3>
                          <p className="product-unit">{item.unit}</p>
                        </div>
                        {cartItem ? (
                          <div className="quantity-control">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                            >
                              -
                            </button>
                            <span>{cartItem.quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            className="add-to-cart-btn"
                            onClick={() => handleAddToCart(item)}
                          >
                            Add
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      </main>

      {totalItems > 0 && (
        <div className="order-summary-bar">
          <div className="summary-details">
            <p>
              {totalItems} Item{totalItems > 1 ? "s" : ""}
            </p>
            <h3>₹{cartTotal.toFixed(2)}</h3>
          </div>
          <button className="summary-checkout-btn" onClick={handleCheckout}>
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
}