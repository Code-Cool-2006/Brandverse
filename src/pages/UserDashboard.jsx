import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import Chatbot from "./Chatbot";
import PaymentPage from "./Payment";
import ARModelsPage from "./ARModelsPage";
// --- Expanded Dummy Data with Restaurants/Cafes ---
const foodItems = [
  {
    id: 1,
    name: "Avocado & Egg Bowl",
    restaurant: "Green Bites",
    price: "9.99",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit-crop",
    category: "veg",
    type: "food",
    diabeticFriendly: true,
  },
  {
    id: 2,
    name: "Grilled Salmon Steak",
    restaurant: "Ocean's Catch",
    price: "14.50",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit-crop",
    category: "non-veg",
    type: "food",
    diabeticFriendly: true,
  },
  {
    id: 3,
    name: "Quinoa Salad",
    restaurant: "Green Bites",
    price: "8.50",
    image:
      "https://www.onelovelylife.com/wp-content/uploads/2024/04/Greek-Quinoa11-3.jpg",
    category: "veg",
    type: "food",
    diabeticFriendly: true,
  },
  {
    id: 4,
    name: "Chicken Teriyaki",
    restaurant: "Tokyo Grill",
    price: "12.00",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3oDb5tGl5xDpuc1XTaHxk7lyNd42o8eoxIw&s",
    category: "non-veg",
    type: "food",
    diabeticFriendly: false,
  },
  {
    id: 5,
    name: "Lentil Soup",
    restaurant: "The Soup Spoon",
    price: "7.00",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkRpRfc7qP3sGjnhfzMQuwe_ggxqzXTmtZlA&s",
    category: "veg",
    type: "food",
    diabeticFriendly: true,
  },
  {
    id: 6,
    name: "Steak with Vegetables",
    restaurant: "The Steakhouse",
    price: "22.99",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjcisjXq-vlVdiqdq-TJTVrD2P1SEicv-J3A&s",
    category: "non-veg",
    type: "food",
    diabeticFriendly: false,
  },
  {
    id: 10,
    name: "Chef's Special Pasta",
    restaurant: "The Grand Feast",
    price: "18.00",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1932&auto=format&fit-crop",
    category: "veg",
    type: "food",
    diabeticFriendly: false,
  },
  {
    id: 11,
    name: "Grilled Lamb Chops",
    restaurant: "The Grand Feast",
    price: "25.00",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEwKKvrIPdownGjBp_8bR6O3-r8zDLhkbf3g&s",
    category: "non-veg",
    type: "food",
    diabeticFriendly: false,
  },
  {
    id: 12,
    name: "Butter Chicken",
    restaurant: "Spice Route",
    price: "16.50",
    image:
      "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/04/butter-chicken-recipe.jpg",
    category: "non-veg",
    type: "food",
    diabeticFriendly: false,
  },
  {
    id: 13,
    name: "Paneer Tikka Masala",
    restaurant: "Spice Route",
    price: "14.00",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpPG2vJ8PHZXEAbxLVvImDUrUXhUF5Ewzn8A&s",
    category: "veg",
    type: "food",
    diabeticFriendly: true,
  },
  {
    id: 14,
    name: "Classic Cheeseburger",
    restaurant: "Burger Junction",
    price: "11.50",
    image:
      "https://leitesculinaria.com/wp-content/uploads/2020/02/classic-cheeseburger-1200.jpg",
    category: "non-veg",
    type: "food",
    diabeticFriendly: false,
  },
  {
    id: 15,
    name: "Veggie Burger",
    restaurant: "Burger Junction",
    price: "9.50",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrmGCwbICddnIVPPR8vL5P0gA9hmWUMt2smg&s",
    category: "veg",
    type: "food",
    diabeticFriendly: false,
  },
  // Added new diabetic-friendly items
  {
    id: 16,
    name: "Chia Seed Pudding",
    restaurant: "The Morning Brew",
    price: "6.50",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSLs13OZQvUWILtpukfIPVoBeJiVd063hUlw&s",
    category: "veg",
    type: "food",
    diabeticFriendly: true,
  },
  {
    id: 17,
    name: "Grilled Chicken Salad",
    restaurant: "Green Bites",
    price: "11.00",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmlIFKHrv2hU_mW2Aqmia1P6nmPfaalqk1YA&s",
    category: "non-veg",
    type: "food",
    diabeticFriendly: true,
  },

  {
    id: 18,
    name: "Vegetable Stir-fry",
    restaurant: "Tokyo Grill",
    price: "10.50",
    image:
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2070&auto-format&fit-crop",
    category: "veg",
    type: "food",
    diabeticFriendly: true,
  },
];

// --- Restaurant Data ---
const restaurantData = [];

// --- Toast Notification Component ---
const ToastNotification = ({ message, isVisible }) => {
  if (!isVisible) return null;
  return (
    <div className="toast-notification">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      {message}
    </div>
  );
};

// --- Nutritional Information Display Component ---
const NutritionalDisplay = ({ itemName, isDiabeticFriendly, aiSummary }) => {
  // Generate sample nutritional data based on item name
  const getNutritionalData = (name) => {
    const lowerName = name.toLowerCase();
    let data = {
      calories: 350,
      carbs: 25,
      protein: 20,
      fat: 15,
      sugar: 5,
      fiber: 8,
      glycemicLoad: "Low",
      ingredients: [
        "Fresh vegetables",
        "Lean protein",
        "Healthy grains",
        "Natural herbs",
      ],
      whyDiabeticFriendly: [
        "Balanced macronutrients",
        "Low sugar content",
        "High fiber content",
        "Low glycemic index",
      ],
    };

    // Customize based on food type
    if (lowerName.includes("salmon") || lowerName.includes("fish")) {
      data = {
        ...data,
        calories: 450,
        protein: 35,
        fat: 22,
        carbs: 25,
        sugar: 3,
        fiber: 3,
      };
    } else if (lowerName.includes("chicken")) {
      data = {
        ...data,
        calories: 380,
        protein: 40,
        fat: 18,
        carbs: 20,
        sugar: 4,
        fiber: 5,
      };
    } else if (lowerName.includes("salad") || lowerName.includes("vegetable")) {
      data = {
        ...data,
        calories: 200,
        protein: 15,
        fat: 8,
        carbs: 30,
        sugar: 8,
        fiber: 12,
      };
    } else if (lowerName.includes("pasta") || lowerName.includes("noodle")) {
      data = {
        ...data,
        calories: 400,
        protein: 15,
        fat: 12,
        carbs: 60,
        sugar: 6,
        fiber: 4,
      };
    }

    return data;
  };

  const nutritionData = getNutritionalData(itemName);
  // Deterministic glycemic bars (avoid random on each render)
  const glycemicBars = useMemo(() => {
    const seed =
      Array.from(itemName || "").reduce(
        (acc, ch) => acc + ch.charCodeAt(0),
        0
      ) || 1;
    let x = seed >>> 0;
    const next = () => (x = (x * 1664525 + 1013904223) >>> 0) / 4294967296;
    return Array.from({ length: 8 }, () => Math.floor(next() * 30 + 10));
  }, [itemName]);

  return (
    <div className="nutritional-display">
      <div className="nutritional-header">
        <h3>{itemName}</h3>
        {isDiabeticFriendly && (
          <div className="diabetes-badge">Diabetes-Friendly</div>
        )}
      </div>
      {aiSummary && (
        <div className="gemini-insights">
          <strong>AI Summary</strong>
          <div style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>
            {aiSummary}
          </div>
        </div>
      )}

      <div className="nutritional-facts">
        <div className="nutrition-item">
          <div className="nutrition-value">{nutritionData.calories} kcal</div>
          <div className="nutrition-label">Calories</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(nutritionData.calories / 5, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="nutrition-item">
          <div className="nutrition-value">{nutritionData.carbs}g</div>
          <div className="nutrition-label">Carbs</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(nutritionData.carbs * 2, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="nutrition-item">
          <div className="nutrition-value">{nutritionData.protein}g</div>
          <div className="nutrition-label">Protein</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(nutritionData.protein * 2.5, 100)}%`,
              }}
            ></div>
          </div>
        </div>

        <div className="nutrition-item">
          <div className="nutrition-value">{nutritionData.fat}g</div>
          <div className="nutrition-label">Fat</div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(nutritionData.fat * 3, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="additional-nutrition">
        <div className="nutrition-item">
          <div className="nutrition-value">{nutritionData.sugar}g</div>
          <div className="nutrition-label">Sugar</div>
        </div>
        <div className="nutrition-item">
          <div className="nutrition-value">{nutritionData.fiber}g</div>
          <div className="nutrition-label">Fiber</div>
        </div>
      </div>

      <div className="glycemic-info">
        <h4>Glycemic Load: {nutritionData.glycemicLoad}</h4>
        <div className="glycemic-chart">
          {glycemicBars.map((h, i) => (
            <div
              key={i}
              className="glycemic-bar"
              style={{ height: `${h}px` }}
            ></div>
          ))}
        </div>
      </div>

      {isDiabeticFriendly && (
        <div className="why-diabetes-friendly">
          <h4>Why this is diabetes-friendly</h4>
          <ul>
            {nutritionData.whyDiabeticFriendly.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="ingredients-section">
        <h4>Key Ingredients</h4>
        <div className="ingredients-list">
          {nutritionData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-item">
              {ingredient}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Cart Sidebar Component ---
const CartSidebar = ({
  cart,
  isOpen,
  onClose,
  onCheckout,
  onGenerateRecipe,
  recipeLoading,
  charityAmount,
  setCharityAmount,
}) => {
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  const totalPrice = cartSubtotal + charityAmount;

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <span>Subtotal:</span>
          <span>${cartSubtotal.toFixed(2)}</span>
        </div>
        <div className="charity-section">
          <div className="charity-input-container">
            <label htmlFor="charity-amount">Charity Amount:</label>
            <div className="charity-input-wrapper">
              <span className="currency-symbol">$</span>
              <input
                id="charity-amount"
                type="number"
                min="0"
                step="0.01"
                value={charityAmount}
                onChange={(e) =>
                  setCharityAmount(parseFloat(e.target.value) || 0)
                }
                className="charity-input"
              />
            </div>
          </div>
          <p
            style={{
              fontSize: "12px",
              color: "#777",
              textAlign: "center",
              marginTop: "5px",
            }}
          >
            Your contribution to charity
          </p>
        </div>
        <div className="cart-total">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="generate-recipe-btn"
          onClick={onGenerateRecipe}
          disabled={cart.length === 0 || recipeLoading}
        >
          {recipeLoading ? "Generating..." : "Generate Recipe ✨"}
        </button>
        <button
          className="checkout-btn"
          onClick={onCheckout}
          disabled={cart.length === 0}
        >
          Checkout All ({cart.length})
        </button>
      </div>
    </div>
  );
};

// --- Checkout Page Component ---
const CheckoutPage = ({ cart, onBack, onPlaceOrder, charityAmount }) => {
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  const totalPrice = cartSubtotal + charityAmount;

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h2>Checkout</h2>
        <button className="back-btn" onClick={onBack}>
          Back to Shopping
        </button>
      </div>
      <div className="checkout-summary">
        <h3>Order Summary</h3>
        <div className="order-items">
          {cart.map((item, index) => (
            <div key={index} className="order-item">
              <span className="order-item-name">{item.name}</span>
              <span className="order-item-price">${item.price}</span>
            </div>
          ))}
        </div>
        <div className="order-total">
          <span>Subtotal:</span>
          <span>${cartSubtotal.toFixed(2)}</span>
        </div>
        <div className="order-total">
          <span>Charity:</span>
          <span>${charityAmount.toFixed(2)}</span>
        </div>
        <div className="order-total">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <button className="place-order-btn" onClick={onPlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

const RecipeModal = ({ recipe, isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Your Custom Recipe</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{recipe}</p>
        </div>
      </div>
    </div>
  );
};

function UserDashboard() {
  const [activeFilter, setActiveFilter] = useState("home");
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [filteredFoodItems, setFilteredFoodItems] = useState(
    foodItems.filter((item) => item.type === "food")
  );
  const [cart, setCart] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const suggestionsRef = useRef(null);
  const [geminiResponses, setGeminiResponses] = useState({});
  const [loadingItems, setLoadingItems] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard"); // New state for pages
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [apiRestaurants, setApiRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [restaurantDishes, setRestaurantDishes] = useState([]);
  const [generatedRecipe, setGeneratedRecipe] = useState(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [recipeLoading, setRecipeLoading] = useState(false);
  const [includeCharity, setIncludeCharity] = useState(true);
  const [charityAmount, setCharityAmount] = useState(2);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [pickupCoordinates, setPickupCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  // --- Load Restaurants from Backend ---
  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/restaurants");
        const data = await res.json();
        const list = Array.isArray(data.restaurants) ? data.restaurants : [];
        setApiRestaurants(list);
        setFilteredRestaurants(list);
      } catch (e) {
        console.warn("Failed to load restaurants", e);
      }
    };
    loadRestaurants();
  }, []);

  // Re-fetch when switching to Restaurants tab
  useEffect(() => {
    const maybeRefresh = async () => {
      if (activeFilter === "restaurants") {
        try {
          const res = await fetch("http://localhost:5000/api/restaurants");
          const data = await res.json();
          const list = Array.isArray(data.restaurants) ? data.restaurants : [];
          setApiRestaurants(list);
        } catch (e) {
          // ignore
        }
      }
    };
    maybeRefresh();
  }, [activeFilter]);

  // --- Build Restaurants with Items for Chatbot ---
  const restaurants = useMemo(() => {
    const map = new Map();
    foodItems.forEach((item) => {
      const rname = item.restaurant;
      if (!rname) return;
      if (!map.has(rname)) {
        map.set(rname, { id: rname, name: rname, items: [] });
      }
      const price =
        typeof item.price === "string" ? parseFloat(item.price) : item.price;
      map
        .get(rname)
        .items.push({ id: item.id, name: item.name, price, image: item.image });
    });
    return Array.from(map.values());
  }, []);

  // --- Persist Cart in localStorage ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch (e) {
      console.warn("Failed to load cart from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // --- Gemini API Call Function ---
  const getGeminiInsights = async (itemName) => {
    setLoadingItems((prev) => ({ ...prev, [itemName]: true }));
    const systemPrompt =
      "You are a helpful culinary assistant. Provide a concise, single-paragraph summary of the nutritional information for the following food item. Include calories, protein, and any key dietary considerations.";
    const userQuery = `What is the nutritional information for: ${itemName}`;
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      tools: [{ google_search: {} }],
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    };

    let responseText =
      "Sorry, I couldn't get the nutritional information right now. Please try again later.";
    let retries = 0;
    const maxRetries = 3;
    const initialDelay = 1000;

    while (retries < maxRetries) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];
        if (candidate && candidate.content?.parts?.[0]?.text) {
          responseText = candidate.content.parts[0].text;
          break;
        } else {
          throw new Error("Invalid response format from Gemini API");
        }
      } catch (error) {
        console.error(`Attempt ${retries + 1} failed:`, error);
        retries++;
        if (retries < maxRetries) {
          await new Promise((res) =>
            setTimeout(res, initialDelay * Math.pow(2, retries))
          );
        }
      }
    }

    setGeminiResponses((prev) => ({ ...prev, [itemName]: responseText }));
    setLoadingItems((prev) => ({ ...prev, [itemName]: false }));
  };

  const getRecipeFromCart = async () => {
    setRecipeLoading(true);
    const itemNames = cart.map((item) => item.name).join(", ");
    const systemPrompt =
      "You are a creative chef. Generate a simple, easy-to-follow recipe using the provided ingredients. The recipe should be brief, including a title, a short description, and a few numbered steps. Do not include a list of ingredients, just use them in the instructions.";
    const userQuery = `Create a recipe using the following ingredients: ${itemNames}`;
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: {
        parts: [{ text: systemPrompt }],
      },
    };

    let responseText =
      "Sorry, I couldn't generate a recipe right now. Please try again later.";
    let retries = 0;
    const maxRetries = 3;
    const initialDelay = 1000;

    while (retries < maxRetries) {
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        const candidate = result.candidates?.[0];
        if (candidate && candidate.content?.parts?.[0]?.text) {
          responseText = candidate.content.parts[0].text;
          break;
        } else {
          throw new Error("Invalid response format from Gemini API");
        }
      } catch (error) {
        console.error(`Attempt ${retries + 1} failed:`, error);
        retries++;
        if (retries < maxRetries) {
          await new Promise((res) =>
            setTimeout(res, initialDelay * Math.pow(2, retries))
          );
        }
      }
    }

    setGeneratedRecipe(responseText);
    setIsRecipeModalOpen(true);
    setRecipeLoading(false);
  };

  // --- Cart and Toast Logic ---
  const handleAddToCart = async (item) => {
    const normalized = {
      ...item,
      price:
        typeof item.price === "string" ? parseFloat(item.price) : item.price,
      quantity: item.quantity || 1,
    };

    // Add to local cart immediately for better UX
    setCart((prev) => [...prev, normalized]);
    setToastMessage(`${item.name} added to cart!`);
    setIsToastVisible(true);
    setTimeout(() => setIsToastVisible(false), 3000);

    // Try to save to backend database
    try {
      // Find the restaurant ID from the API restaurants
      const restaurant = apiRestaurants.find((r) => r.name === item.restaurant);
      if (restaurant) {
        const response = await fetch(
          `http://localhost:5000/api/restaurants/${restaurant.id}/dishes`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: item.name,
              price: normalized.price,
              image: item.image || "",
              category: item.category || "multi",
              diabeticFriendly: item.diabeticFriendly || false,
            }),
          }
        );

        if (!response.ok) {
          console.warn("Failed to save dish to backend:", response.statusText);
          // Don't show error to user as the cart functionality still works
        } else {
          console.log("Dish saved to backend successfully");
        }
      } else {
        console.warn(
          "Restaurant not found in API restaurants, skipping backend save"
        );
      }
    } catch (error) {
      console.warn("Error saving dish to backend:", error);
      // Don't show error to user as the cart functionality still works
    }
  };

  const handleCheckoutAll = () => {
    if (cart.length > 0) {
      setCurrentPage("checkout");
      setIsSidebarOpen(false);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentPage("dashboard");
    setSelectedRestaurant(null);
  };

  // --- Filter Logic ---
  const handleFilterClick = (filter) => {
    if (filter !== activeFilter) {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveFilter(filter);
        setIsAnimating(false);
        setSelectedRestaurant(null); // Reset selected restaurant when changing tabs
        setFilteredFoodItems(foodItems.filter((item) => item.type === "food"));
      }, 300);
    }
  };

  // --- Search Logic ---
  const performSearch = (query) => {
    let items = foodItems;

    // Filter by the current tab's logic
    if (activeFilter === "veg") {
      items = items.filter((item) => item.category === "veg");
    } else if (activeFilter === "non-veg") {
      items = items.filter((item) => item.category === "non-veg");
    } else if (activeFilter === "diabetic") {
      items = items.filter((item) => item.diabeticFriendly === true);
    }

    if (query.length > 0) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    setFilteredFoodItems(items.filter((item) => item.type === "food"));
    setSuggestions([]);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setActiveSuggestionIndex(-1); // Reset selection on new input
    if (query.length > 0) {
      const searchSuggestions = foodItems.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(searchSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    performSearch(suggestion.name);
  };

  const handleSearchKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    } else if (e.key === "Enter") {
      if (activeSuggestionIndex > -1) {
        handleSuggestionClick(suggestions[activeSuggestionIndex]);
      }
    }
  };

  // Auto-scroll for keyboard navigation in suggestions
  useEffect(() => {
    if (activeSuggestionIndex > -1 && suggestionsRef.current) {
      const activeItem = suggestionsRef.current.children[activeSuggestionIndex];
      if (activeItem) {
        activeItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [activeSuggestionIndex]);

  // --- Filtering Effect ---
  useEffect(() => {
    let items = foodItems;
    if (activeFilter === "veg") {
      items = items.filter((item) => item.category === "veg");
    } else if (activeFilter === "non-veg") {
      items = items.filter((item) => item.category === "non-veg");
    } else if (activeFilter === "diabetic") {
      items = items.filter((item) => item.diabeticFriendly === true);
    }
    setFilteredFoodItems(items.filter((item) => item.type === "food"));

    if (activeFilter === "restaurants") {
      setFilteredRestaurants(
        apiRestaurants.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [activeFilter, searchQuery, apiRestaurants]);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  );
  const cartTotalPrice = cartSubtotal + charityAmount;

  const handlePlaceOrder = () => {
    const totalAmount = cartTotalPrice.toFixed(2);
    localStorage.setItem("orderTotal", totalAmount);
    localStorage.setItem("orderItems", JSON.stringify(cart));
    // Navigate to payment page
    setCurrentPage("payment");
  };

  const navigate = (path) => {
    if (path === "/payment") {
      handlePlaceOrder();
    }
  };

  // --- Restaurants Handlers ---
  const handleRestaurantClick = async (restaurant) => {
    setSelectedRestaurant(restaurant);

    // Fetch dishes from backend instead of using static data
    try {
      const response = await fetch(
        `http://localhost:5000/api/restaurants/${restaurant.id}/dishes`
      );
      const data = await response.json();
      const dishes = data.dishes || [];
      setRestaurantDishes(dishes);
    } catch (error) {
      console.error("Error fetching restaurant dishes:", error);
      // Fallback to static data if API fails
      const fallbackDishes = foodItems.filter(
        (item) => item.restaurant && item.restaurant === restaurant.name
      );
      setRestaurantDishes(fallbackDishes);
    }
  };

  const removeFromCart = (itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId));
  };
const handleNavigateToAR = () => {
  setCurrentPage("armodels");
};
  return (
    <>
      <style>{`
        /* UserDashboard.css */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        /* Removed global body/#root overrides to prevent conflicts */
        .dashboard-container {
          min-height: 100vh;
          width: 100%;
          position: relative;
        }
        /* Header Styles */
        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 40px;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .logo {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 24px;
          color: #1a73e8;
        }
        .dashboard-nav {
          display: flex;
          gap: 0;
        }
        .dashboard-nav a {
          background: none;
          border: none;
          font-size: 16px;
          margin: 0 15px;
          cursor: pointer;
          color: #555;
          padding: 10px 5px;
          transition: all 0.3s ease;
          position: relative;
          text-decoration: none;
        }
        .dashboard-nav a.active {
          color: #1a73e8;
          font-weight: bold;
        }
        .dashboard-nav a.active::after {
          content: "";
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          height: 3px;
          background-color: #1a73e8;
          border-radius: 2px;
        }
        .user-profile-section {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .icon-button {
          background: none;
          border: none;
          cursor: pointer;
          color: #555;
        }
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        /* Main Content */
        .dashboard-main {
          padding: 20px 40px;
        }
        /* Search Bar */
        .search-container {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .search-bar {
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 500px;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 25px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
          padding-left: 15px;
        }
        .search-bar:focus-within {
          border-color: #1a73e8;
          box-shadow: 0 2px 8px rgba(26, 115, 232, 0.2);
        }
        .search-bar input {
          flex: 1;
          padding: 12px 10px;
          border: none;
          background: none;
          font-size: 16px;
          outline: none;
        }
        .search-bar .search-icon {
            color: #888;
        }
        .search-button {
          background-color: #1a73e8;
          color: #fff;
          border: none;
          border-radius: 25px;
          padding: 12px 25px;
          font-size: 16px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .search-button:hover {
          background-color: #1557b0;
        }
        .search-suggestions {
            position: absolute;
            top: calc(100% + 5px);
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            max-width: 500px;
            max-height: 200px;
            overflow-y: auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            list-style: none;
            padding: 0;
            z-index: 10;
        }
        .search-suggestions li {
            padding: 12px 20px;
            cursor: pointer;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: background-color 0.2s ease;
        }
        .search-suggestions li:last-child {
            border-bottom: none;
        }
        .search-suggestions li:hover, .search-suggestions li.active {
            background-color: #f0f0f0;
        }
        .suggestion-type {
            font-size: 12px;
            color: #999;
            text-transform: capitalize;
        }
        /* Recommended Section */
        .recommendations {
          margin-bottom: 30px;
        }
        .recommendations h2 {
          margin-bottom: 20px;
          color: #333;
          font-size: 24px;
        }
          /* Styling for the new header container */
.recommendations-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Remove default margin from the h2 tag inside the new header */
.recommendations-header h2 {
  margin-bottom: 0;
}

/* Styling for your new button */
.view-3d-btn {
  background: linear-gradient(to right, #8e2de2, #4a00e0);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.3s ease;
}

.view-3d-btn:hover {
  opacity: 0.9;
}
        .promo-card {
            background: linear-gradient(to right, #667eea, #764ba2);
            color: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .promo-text h3 {
            margin: 0 0 5px 0;
            font-size: 24px;
        }
        .promo-text span {
            font-size: 14px;
            opacity: 0.8;
        }
        .content-section {
          opacity: 1;
          transition: opacity 0.3s ease-in-out;
        }
        .content-section.fade-out {
          opacity: 0;
        }
        .content-section.fade-in {
          opacity: 1;
        }
        /* Food Grid */
        .food-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }
        /* Food Cards */
        .food-card {
          background-color: #ffffff;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .food-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }
        .food-image-container {
            position: relative;
            width: 100%;
            height: 200px;
            overflow: hidden;
        }
        .food-image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        .food-card:hover img {
            transform: scale(1.05);
        }
        .fav-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.7);
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .fav-button:hover {
            background: rgba(255, 255, 255, 1);
        }
        .fav-button svg {
            color: #d32f2f;
        }
        .food-details {
          display: flex;
          flex-direction: column;
          padding: 15px;
        }
        .food-details h3 {
          margin: 0 0 5px 0;
          font-size: 18px;
          color: #333;
          font-weight: 600;
        }
        .food-details p {
          margin: 0;
          color: #777;
          font-size: 14px;
        }
        .food-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10px;
        }
        .food-meta span {
            font-weight: bold;
            color: #1a73e8;
            font-size: 18px;
        }
        .add-button {
            background-color: #4caf50;
            color: white;
            border: none;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            font-size: 20px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .add-button:hover {
            background-color: #45a049;
            transform: scale(1.1);
        }
        .gemini-insights-btn {
            background: linear-gradient(to right, #4F46E5, #9333EA);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 15px;
            margin-top: 10px;
            font-weight: 500;
            cursor: pointer;
            transition: opacity 0.3s ease;
            width: 100%;
            text-align: center;
        }
        .gemini-insights-btn:hover {
            opacity: 0.9;
        }
        .gemini-insights {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 20px;
            margin-top: 15px;
            font-size: 14px;
            color: #4b5563;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .nutritional-facts {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin: 15px 0;
        }
        
        .nutrition-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 10px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .nutrition-value {
            font-size: 18px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 5px;
        }
        
        .nutrition-label {
            font-size: 12px;
            color: #6b7280;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .progress-bar {
            width: 100%;
            height: 6px;
            background-color: #e5e7eb;
            border-radius: 3px;
            margin-top: 8px;
            overflow: hidden;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #10b981, #34d399);
            border-radius: 3px;
            transition: width 0.3s ease;
        }
        
        .diabetes-badge {
            display: inline-flex;
            align-items: center;
            background: linear-gradient(135deg, #10b981, #34d399);
            color: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            margin: 10px 0;
        }
        
        .diabetes-badge::before {
            content: "✓";
            margin-right: 6px;
            font-weight: bold;
        }
        
        .glycemic-info {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 4px solid #10b981;
        }
        
        .glycemic-chart {
            display: flex;
            align-items: end;
            gap: 4px;
            margin: 10px 0;
            height: 60px;
        }
        
        .glycemic-bar {
            background: linear-gradient(180deg, #10b981, #34d399);
            border-radius: 2px 2px 0 0;
            min-width: 8px;
            transition: height 0.3s ease;
        }
        
        .ingredients-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 15px 0;
        }
        
.ingredient-item {
            display: flex;
            align-items: center;
            background: white;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            color: #374151;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .ingredient-item::before {
            content: "✓";
            color: #10b981;
            margin-right: 6px;
            font-weight: bold;
        }
        
        .why-diabetes-friendly {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
        }
        
        .why-diabetes-friendly h4 {
            color: #166534;
            margin: 0 0 10px 0;
            font-size: 14px;
            font-weight: 600;
        }
        
        .why-diabetes-friendly ul {
            margin: 0;
            padding-left: 20px;
        }
        
        .why-diabetes-friendly li {
            color: #166534;
            font-size: 13px;
            margin-bottom: 5px;
        }
        
        .nutritional-display {
            background: white;
            border-radius: 12px;
            padding: 20px;
            margin-top: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .nutritional-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #f1f5f9;
        }
        
        .nutritional-header h3 {
            margin: 0;
            color: #1f2937;
            font-size: 20px;
            font-weight: 600;
        }
        
        .additional-nutrition {
            display: flex;
            gap: 15px;
            margin: 15px 0;
            justify-content: center;
        }
        
        .additional-nutrition .nutrition-item {
            flex: 0 0 auto;
            min-width: 80px;
        }
        
        .ingredients-section h4 {
            color: #374151;
            margin: 15px 0 10px 0;
            font-size: 14px;
            font-weight: 600;
        }
        .toast-notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #4caf50;
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            animation: fadeInOut 3s forwards;
        }
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translateX(-50%) scale(0.8); }
            10%, 90% { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        /* Sidebar Styles */
        .cart-sidebar {
            position: fixed;
            top: 0;
            right: 0;
            height: 100%;
            width: 350px;
            background: #ffffff;
            box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.4s ease-in-out;
            z-index: 500;
            display: flex;
            flex-direction: column;
        }
        .cart-sidebar.open {
            transform: translateX(0);
        }
        .cart-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }
        .cart-header h2 {
            margin: 0;
        }
        .cart-header .close-btn {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }
        .cart-items {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        }
        .empty-cart-message {
            text-align: center;
            color: #777;
            margin-top: 50px;
        }
        .cart-item {
            display: flex;
            align-items: center;
            gap: 15px;
            margin-bottom: 15px;
            background: #f9f9f9;
            padding: 10px;
            border-radius: 10px;
        }
        .cart-item-image {
            width: 60px;
            height: 60px;
            object-fit: cover;
            border-radius: 8px;
        }
        .cart-item-details {
            flex: 1;
        }
        .cart-item-details h3 {
            margin: 0;
            font-size: 16px;
        }
        .cart-item-details p {
            margin: 5px 0 0;
            font-weight: bold;
            color: #1a73e8;
        }
        .cart-footer {
            padding: 20px;
            border-top: 1px solid #eee;
        }
        .charity-section {
            margin-bottom: 15px;
        }
        .charity-input-container {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .charity-input-container label {
            font-size: 14px;
            font-weight: 600;
            color: #333;
        }
        .charity-input-wrapper {
            display: flex;
            align-items: center;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #fff;
            overflow: hidden;
            transition: border-color 0.3s ease;
        }
        .charity-input-wrapper:focus-within {
            border-color: #1a73e8;
            box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
        }
        .currency-symbol {
            padding: 12px 8px;
            background-color: #f8f9fa;
            border-right: 1px solid #ddd;
            color: #666;
            font-weight: 500;
        }
        .charity-input {
            flex: 1;
            padding: 12px 10px;
            border: none;
            background: none;
            font-size: 16px;
            outline: none;
            color: #333;
        }
        .charity-input::-webkit-outer-spin-button,
        .charity-input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
        .cart-total {
            display: flex;
            justify-content: space-between;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 15px;
        }
        .checkout-btn {
            background: linear-gradient(to right, #4caf50, #45a049);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 12px 20px;
            font-size: 16px;
            cursor: pointer;
            width: 100%;
            transition: opacity 0.3s ease;
            margin-top: 10px;
        }
        .checkout-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .generate-recipe-btn {
          background: linear-gradient(to right, #6366f1, #a855f7);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 16px;
          cursor: pointer;
          width: 100%;
          transition: opacity 0.3s ease;
          margin-bottom: 10px;
        }
        .generate-recipe-btn:hover {
          opacity: 0.9;
        }
        /* Checkout Page Styles */
        .checkout-page {
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          animation: fadeIn 0.5s ease-in-out;
        }
        .checkout-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #eee;
          padding-bottom: 20px;
        }
        .checkout-header h2 {
          font-size: 28px;
          margin: 0;
        }
        .back-btn {
          background-color: #e0e0e0;
          color: #333;
          border: none;
          padding: 10px 20px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        .back-btn:hover {
          background-color: #d0d0d0;
        }
        .checkout-summary {
          border: 1px solid #eee;
          border-radius: 10px;
          padding: 20px;
        }
        .checkout-summary h3 {
          text-align: center;
          margin-top: 0;
          font-size: 22px;
          color: #333;
        }
        .order-items {
          margin-top: 20px;
          border-bottom: 1px solid #eee;
          padding-bottom: 15px;
        }
        .order-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          font-size: 16px;
        }
        .order-item-name {
          color: #555;
        }
        .order-item-price {
          font-weight: 500;
          color: #333;
        }
        .order-total {
          display: flex;
          justify-content: space-between;
          font-size: 22px;
          font-weight: bold;
          margin-top: 15px;
        }
        .place-order-btn {
          background: linear-gradient(to right, #4caf50, #45a049);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 15px 25px;
          font-size: 18px;
          cursor: pointer;
          margin-top: 20px;
          width: 100%;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .place-order-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .restaurant-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        .restaurant-card {
            background-color: #ffffff;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            cursor: pointer;
        }
        .restaurant-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }
        .restaurant-card img {
            width: 100%;
            height: 180px;
            object-fit: cover;
            transition: transform 0.3s ease;
        }
        .restaurant-card:hover img {
            transform: scale(1.05);
        }
        .restaurant-details {
            padding: 15px;
        }
        .restaurant-details h3 {
            margin: 0 0 5px 0;
            font-size: 20px;
            color: #333;
            font-weight: 600;
        }
        .restaurant-details p {
            margin: 0;
            color: #777;
            font-size: 14px;
        }
        .menu-header {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
        }
        .menu-header h2 {
            font-size: 28px;
            margin: 0;
        }
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 15px;
          width: 90%;
          max-width: 600px;
          max-height: 80%;
          overflow-y: auto;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }
        .modal-body {
          white-space: pre-wrap;
        }
        .ar-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 2000;
          animation: fadeIn 0.3s ease-in-out;
        }
        .ar-modal-content {
          position: relative;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 20px;
          width: 90%;
          max-width: 500px;
          height: 90%;
          max-height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .close-ar-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          color: white;
          font-size: 24px;
          font-weight: bold;
          cursor: pointer;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
        }
        .close-ar-btn:hover {
          background: rgba(255, 255, 255, 0.5);
        }
        .ar-placeholder {
          text-align: center;
          color: white;
          font-size: 16px;
        }
        .ar-placeholder img {
          width: 100%;
          max-width: 300px;
          height: auto;
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .view-ar-btn {
          background: linear-gradient(to right, #4CAF50, #2196F3);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 14px;
          cursor: pointer;
          transition: transform 0.2s ease;
          width: 100%;
          margin-top: 10px;
        }
        .view-ar-btn:hover {
            transform: scale(1.05);
        }
        /* Payment Page Styles */
        .payment-page {
          padding: 40px;
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          border-radius: 15px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          animation: fadeIn 0.5s ease-in-out;
        }
        .payment-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #eee;
          padding-bottom: 20px;
        }
        .payment-header h2 {
          font-size: 28px;
          margin: 0;
        }
        .payment-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }
        .order-summary, .payment-methods {
          background: #f9f9f9;
          border-radius: 10px;
          padding: 20px;
        }
        .order-summary h3, .payment-methods h3 {
          margin-top: 0;
          font-size: 22px;
          color: #333;
        }
        .order-items {
          margin-top: 20px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 15px;
        }
        .order-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          font-size: 16px;
        }
        .order-item-name {
          color: #555;
        }
        .order-item-price {
          font-weight: 500;
          color: #333;
        }
        .order-total {
          display: flex;
          justify-content: space-between;
          font-size: 22px;
          font-weight: bold;
          margin-top: 15px;
          padding-top: 15px;
          border-top: 2px solid #ddd;
        }
        .total-amount {
          color: #4caf50;
          font-size: 24px;
        }
        .payment-options {
          margin-top: 20px;
        }
        .payment-option {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          transition: border-color 0.3s ease;
        }
        .payment-option:hover {
          border-color: #1a73e8;
        }
        .payment-option input[type="radio"] {
          margin-right: 10px;
        }
        .payment-option label {
          font-size: 16px;
          cursor: pointer;
        }
        .pay-now-btn {
          background: linear-gradient(to right, #4caf50, #45a049);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 15px 25px;
          font-size: 18px;
          cursor: pointer;
          margin-top: 30px;
          width: 100%;
          font-weight: 600;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .pay-now-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      <div className="dashboard-container">
        <ToastNotification message={toastMessage} isVisible={isToastVisible} />
        <RecipeModal
          recipe={generatedRecipe}
          isOpen={isRecipeModalOpen}
          onClose={() => setIsRecipeModalOpen(false)}
        />
        <header className="dashboard-header">
          <div className="logo">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="#34D399"></path>
              <path
                d="M2 7L12 12L22 7"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M12 22V12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <h1>TomatoVerse</h1>
          </div>
          <nav className="dashboard-nav">
            <a
              href="#"
              className={activeFilter === "home" ? "active" : ""}
              onClick={() => handleFilterClick("home")}
            >
              Home
            </a>
            <a
              href="#"
              className={activeFilter === "veg" ? "active" : ""}
              onClick={() => handleFilterClick("veg")}
            >
              Veg Foods
            </a>
            <a
              href="#"
              className={activeFilter === "non-veg" ? "active" : ""}
              onClick={() => handleFilterClick("non-veg")}
            >
              Non-Veg Foods
            </a>
            <a
              href="#"
              className={activeFilter === "restaurants" ? "active" : ""}
              onClick={() => handleFilterClick("restaurants")}
            >
              Restaurants
            </a>
            <a
              href="#"
              className={activeFilter === "diabetic" ? "active" : ""}
              onClick={() => handleFilterClick("diabetic")}
            >
              Diabetic
            </a>
          </nav>
          <div className="user-profile-section">
            <button
              className="icon-button"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-shopping-cart"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="user-avatar"
            />
          </div>
        </header>
        {currentPage === "dashboard" && (
          <main className="dashboard-main">
            <div className="search-container">
              <div className="search-bar">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="search-icon"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                  type="text"
                  placeholder="Search for food, restaurants, cafes..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={handleSearchKeyDown}
                />
                <button
                  className="search-button"
                  onClick={() => performSearch(searchQuery)}
                >
                  Search
                </button>
              </div>
              {suggestions.length > 0 && (
                <ul className="search-suggestions" ref={suggestionsRef}>
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={suggestion.id}
                      className={
                        index === activeSuggestionIndex ? "active" : ""
                      }
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.name}{" "}
                      <span className="suggestion-type">{suggestion.type}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <section
              className={`content-section ${
                isAnimating ? "fade-out" : "fade-in"
              }`}
            >
              {(activeFilter === "home" ||
                activeFilter === "veg" ||
                activeFilter === "non-veg" ||
                activeFilter === "diabetic") && (
                <>
                  <section className="recommendations">
  {/* This is the new container for the heading and button */}
  <div className="recommendations-header">
  <h2>Recommended for You</h2>
  <button className="view-3d-btn" onClick={handleNavigateToAR}> 
    View AR models
  </button>
</div>
  <div className="promo-card">
    <div className="promo-text">
      <h3>Today's top picks for you..</h3>
      <span>Specially made for you</span>
    </div>
  </div>
</section>
                  <section className="food-grid">
                    {filteredFoodItems.map((item) => (
                      <div className="food-card" key={item.id}>
                        <div className="food-image-container">
                          <img src={item.image} alt={item.name} />
                          <button className="fav-button">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                          </button>
                        </div>
                        <div className="food-details">
                          <h3>{item.name}</h3>
                          <p>{item.restaurant}</p>
                          <div className="food-meta">
                            <span>${item.price}</span>
                            <button
                              className="add-button"
                              onClick={() => handleAddToCart(item)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="food-insights-section">
                          <button
                            className="gemini-insights-btn"
                            onClick={() => getGeminiInsights(item.name)}
                            disabled={loadingItems[item.name]}
                          >
                            {loadingItems[item.name]
                              ? "Loading..."
                              : "Gemini's Insights ✨"}
                          </button>
                          {geminiResponses[item.name] && (
                            <NutritionalDisplay
                              itemName={item.name}
                              isDiabeticFriendly={item.diabeticFriendly}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </section>
                </>
              )}

              {activeFilter === "restaurants" && !selectedRestaurant && (
                <section>
                  <h2>Restaurants</h2>
                  <div className="restaurant-grid">
                    {filteredRestaurants.map((restaurant) => (
                      <div
                        key={restaurant.id}
                        className="restaurant-card"
                        onClick={() => handleRestaurantClick(restaurant)}
                      >
                        <img src={restaurant.image} alt={restaurant.name} />
                        <div className="restaurant-details">
                          <h3>{restaurant.name}</h3>
                          <p>{`${restaurant.type || ""}${
                            restaurant.category
                              ? (restaurant.type ? " • " : "") +
                                restaurant.category
                              : ""
                          }`}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {activeFilter === "restaurants" && selectedRestaurant && (
                <section>
                  <div className="menu-header">
                    <button
                      className="back-btn"
                      onClick={() => setSelectedRestaurant(null)}
                    >
                      Back to Restaurants
                    </button>
                    <h2>{selectedRestaurant.name}'s Menu</h2>
                  </div>
                  <div className="food-grid">
                    {restaurantDishes.map((item) => (
                      <div className="food-card" key={item.id}>
                        <div className="food-image-container">
                          <img src={item.image} alt={item.name} />
                          <button className="fav-button">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                            </svg>
                          </button>
                        </div>
                        <div className="food-details">
                          <h3>{item.name}</h3>
                          <p>{selectedRestaurant.name}</p>
                          <div className="food-meta">
                            <span>${parseFloat(item.price).toFixed(2)}</span>
                            <button
                              className="add-button"
                              onClick={() =>
                                handleAddToCart({
                                  ...item,
                                  restaurant: selectedRestaurant.name,
                                  type: "food",
                                })
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="food-insights-section">
                          <button
                            className="gemini-insights-btn"
                            onClick={() => getGeminiInsights(item.name)}
                            disabled={loadingItems[item.name]}
                          >
                            {loadingItems[item.name]
                              ? "Loading..."
                              : "Gemini's Insights ✨"}
                          </button>
                          {geminiResponses[item.name] && (
                            <NutritionalDisplay
                              itemName={item.name}
                              isDiabeticFriendly={item.diabeticFriendly}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </section>
          </main>
        )}
        {currentPage === "checkout" && (
          <CheckoutPage
            cart={cart}
            totalPrice={cartTotalPrice}
            onBack={handleBackToDashboard}
            onPlaceOrder={handlePlaceOrder}
            includeCharity={includeCharity}
            setIncludeCharity={setIncludeCharity}
            charityAmount={charityAmount}
          />
        )}
        {currentPage === "payment" && (
          <PaymentPage onBack={handleBackToDashboard} />
        )}
         {currentPage === "armodels" && (
        <ARModelsPage onBack={handleBackToDashboard} />
      )}
        <CartSidebar
          cart={cart}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onCheckout={handleCheckoutAll}
          onGenerateRecipe={getRecipeFromCart}
          recipeLoading={recipeLoading}
          charityAmount={charityAmount}
          setCharityAmount={setCharityAmount}
        />
        <Chatbot
          restaurants={restaurants}
          navigate={navigate}
          cart={cart}
          addToCart={handleAddToCart}
          removeFromCart={removeFromCart}
        />
      </div>
    </>
  );
}
export default UserDashboard;