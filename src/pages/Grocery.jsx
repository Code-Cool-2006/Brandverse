import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "/.Grocery.css";

// --- Comprehensive Dummy Data for Groceries ---
const groceryData = {
  categories: [
    { id: "fresh", name: "Fresh Corner" },
    { id: "snacks", name: "Chips & Snacks" },
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
        "https://images.unsplash.com/photo-1587049352851-d481dd12356d?q=80&w=1974&auto=format&fit=crop",
      unit: "1 kg",
    },
    {
      id: 102,
      category: "fresh",
      name: "Ripe Tomatoes",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1561138723-c3d31229a8a3?q=80&w=2070&auto=format&fit=crop",
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

    // Snacks
    {
      id: 201,
      category: "snacks",
      name: "Lay's India's Magic Masala",
      price: 20,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/294275_18-lays-potato-chips-indias-magic-masala.jpg",
      unit: "52 g",
    },
    {
      id: 202,
      category: "snacks",
      name: "Lay's American Style Cream & Onion",
      price: 20,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/294274_21-lays-potato-chips-american-style-cream-onion-flavour.jpg",
      unit: "52 g",
    },
    {
      id: 203,
      category: "snacks",
      name: "Bingo! Mad Angles Achaari Masti",
      price: 10,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40016335_21-bingo-mad-angles-chips-achaari-masti.jpg",
      unit: "40 g",
    },
    {
      id: 204,
      category: "snacks",
      name: "Parle-G Gold Biscuits",
      price: 10,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1203933_7-parle-g-gold-biscuits.jpg",
      unit: "100 g",
    },
    {
      id: 205,
      category: "snacks",
      name: "Britannia Good Day Cashew",
      price: 40,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40018898_14-britannia-good-day-cashew-cookies.jpg",
      unit: "200 g",
    },
    {
      id: 206,
      category: "snacks",
      name: "Sunfeast Marie Light",
      price: 30,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1202685_5-sunfeast-marie-light-biscuits-active.jpg",
      unit: "300 g",
    },
    {
      id: 207,
      category: "snacks",
      name: "Cadbury Oreo Vanilla Creme",
      price: 30,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40026336_3-cadbury-oreo-vanilla-creme-biscuit.jpg",
      unit: "120 g",
    },

    // Juices
    {
      id: 301,
      category: "juices",
      name: "Appy Fizz",
      price: 40,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/251009_14-appy-fizz-sparkling-apple-juice-drink.jpg",
      unit: "250 ml",
    },
    {
      id: 302,
      category: "juices",
      name: "Maaza Mango Drink",
      price: 75,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1204481_3-maaza-mango-drink.jpg",
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
    {
      id: 304,
      category: "juices",
      name: "Real Fruit Power Cranberry",
      price: 125,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40120228_6-real-fruit-power-juice-cranberry.jpg",
      unit: "1 L",
    },

    // Dairy
    {
      id: 401,
      category: "dairy",
      name: "Amul Gold Milk",
      price: 30,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40045955_4-amul-homogenised-standardised-milk.jpg",
      unit: "500 ml",
    },
    {
      id: 402,
      category: "dairy",
      name: "Britannia Brown Bread",
      price: 50,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/40013206_12-britannia-100-whole-wheat-bread.jpg",
      unit: "400 g",
    },

    // Cleaning
    {
      id: 501,
      category: "cleaning",
      name: "Harpic Powerplus Toilet Cleaner",
      price: 95,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/242521_21-harpic-powerplus-toilet-cleaner-original.jpg",
      unit: "500 ml",
    },
    {
      id: 502,
      category: "cleaning",
      name: "Surf Excel Matic Liquid Detergent",
      price: 240,
      image:
        "https://www.bigbasket.com/media/uploads/p/l/1203912_5-surf-excel-matic-top-load-liquid-detergent.jpg",
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
