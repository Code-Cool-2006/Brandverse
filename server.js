import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (replace with database in production)
let users = [];
// Seed restaurants with a few initial entries so UI isn't empty on first load
let restaurants = [
  {
    id: 7,
    name: "Green Bites",
    type: "restaurant",
    category: "veg",
    image:
      "https://images.unsplash.com/photo-1552561993-9c8449c25f4d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Ocean's Catch",
    type: "restaurant",
    category: "non-veg",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "The Morning Brew",
    type: "cafe",
    category: "veg",
    image:
      "https://images.unsplash.com/photo-1497935402773-455b3c5a61b8?q=80&w=2070&auto=format&fit=crop",
  },
];

// In-memory dishes, keyed by restaurantId
let dishes = [
  // { id, restaurantId, name, price, image, category, diabeticFriendly }
  { id: 1, restaurantId: 7, name: "Avocado & Egg Bowl", price: 9.99, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop", category: "veg", diabeticFriendly: true },
  { id: 2, restaurantId: 8, name: "Grilled Salmon Steak", price: 14.5, image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop", category: "non-veg", diabeticFriendly: true },
  { id: 3, restaurantId: 9, name: "Chia Seed Pudding", price: 6.5, image: "https://images.unsplash.com/photo-1530990393275-c54d720b0c03?q=80&w=1974&auto=format&fit=crop", category: "veg", diabeticFriendly: true },
];

// In-memory orders (simple demo store)
let orders = [];

// JWT secret key
const JWT_SECRET = "your-secret-key-change-in-production";

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = users.find(
      (u) => u.username === username || u.email === username
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Orders API ---
// Create a new order from the User Dashboard
app.post("/api/orders", (req, res) => {
  try {
    const { userKey, items = [], total = 0, destination } = req.body;
    if (!userKey) {
      return res.status(400).json({ message: "'userKey' is required" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "'items' must be a non-empty array" });
    }

    const newOrder = {
      id: orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1,
      userKey,
      items,
      total: parseFloat(total) || 0,
      status: "pending", // pending -> accepted -> completed
      pickup: { lat: 15.8647, lng: 74.5208 },
      destination:
        destination && destination.lat && destination.lng
          ? destination
          : { lat: 15.8569, lng: 74.5097 },
      createdAt: new Date().toISOString(),
      deliveredAt: null,
    };

    orders.push(newOrder);
    res.status(201).json({ message: "Order created", order: newOrder });
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// List orders; partners can query by status
app.get("/api/orders", (req, res) => {
  try {
    const { status } = req.query;
    let result = orders;
    if (status) {
      result = result.filter((o) => o.status === status);
    }
    res.json({ orders: result });
  } catch (error) {
    console.error("List orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single order
app.get("/api/orders/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const order = orders.find((o) => o.id === id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json({ order });
});

// Accept an order (partner action)
app.patch("/api/orders/:id/accept", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return res.status(404).json({ message: "Order not found" });
    orders[idx].status = "accepted";
    res.json({ message: "Order accepted", order: orders[idx] });
  } catch (error) {
    console.error("Accept order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Complete an order (partner action)
app.patch("/api/orders/:id/complete", (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const idx = orders.findIndex((o) => o.id === id);
    if (idx === -1) return res.status(404).json({ message: "Order not found" });
    orders[idx].status = "completed";
    orders[idx].deliveredAt = new Date().toISOString();
    res.json({ message: "Order completed", order: orders[idx] });
  } catch (error) {
    console.error("Complete order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Latest order for a userKey (for User Dashboard status)
app.get("/api/orders/latest", (req, res) => {
  try {
    const { userKey } = req.query;
    if (!userKey) return res.status(400).json({ message: "'userKey' is required" });
    const userOrders = orders
      .filter((o) => o.userKey === userKey)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const latest = userOrders[0] || null;
    res.json({ order: latest });
  } catch (error) {
    console.error("Latest order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Register endpoint - Fixed to not auto-login
app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = users.find(
      (u) => u.username === username || u.email === email
    );

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
    };

    users.push(newUser);

    // Don't generate token - just return success message
    res.status(201).json({
      message: "Registration successful! Please login with your credentials.",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get current user endpoint (protected)
app.get("/api/user", (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = users.find((u) => u.id === decoded.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Invalid token" });
  }
});

// Restaurants API
// GET all restaurants
app.get("/api/restaurants", (req, res) => {
  res.json({ restaurants });
});

// POST create a new restaurant
app.post("/api/restaurants", (req, res) => {
  try {
    const { name, type = "restaurant", category = "multi", image = "" } = req.body;
    if (!name) {
      return res.status(400).json({ message: "'name' is required" });
    }
    const newRestaurant = {
      id: restaurants.length ? Math.max(...restaurants.map((r) => r.id)) + 1 : 1,
      name,
      type,
      category,
      image,
    };
    restaurants.push(newRestaurant);
    res.status(201).json({ message: "Restaurant created", restaurant: newRestaurant });
  } catch (error) {
    console.error("Create restaurant error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET dishes for a restaurant
app.get("/api/restaurants/:id/dishes", (req, res) => {
  const rid = parseInt(req.params.id, 10);
  if (Number.isNaN(rid)) {
    return res.status(400).json({ message: "Invalid restaurant id" });
  }
  const exists = restaurants.some((r) => r.id === rid);
  if (!exists) {
    return res.status(404).json({ message: "Restaurant not found" });
  }
  const items = dishes.filter((d) => d.restaurantId === rid);
  res.json({ dishes: items });
});

// POST create a new dish for a restaurant
app.post("/api/restaurants/:id/dishes", (req, res) => {
  try {
    const rid = parseInt(req.params.id, 10);
    if (Number.isNaN(rid)) {
      return res.status(400).json({ message: "Invalid restaurant id" });
    }
    const restaurant = restaurants.find((r) => r.id === rid);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    const { name, price, image = "", category = "veg", diabeticFriendly = false } = req.body;
    if (!name || price === undefined || price === null || isNaN(parseFloat(price))) {
      return res.status(400).json({ message: "'name' and numeric 'price' are required" });
    }
    const newDish = {
      id: dishes.length ? Math.max(...dishes.map((d) => d.id)) + 1 : 1,
      restaurantId: rid,
      name,
      price: parseFloat(price),
      image,
      category,
      diabeticFriendly: Boolean(diabeticFriendly),
    };
    dishes.push(newDish);
    res.status(201).json({ message: "Dish created", dish: newDish });
  } catch (error) {
    console.error("Create dish error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
