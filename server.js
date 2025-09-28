import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Secret for JWT (should be in environment variable)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// In-memory storage (replace with DB later if needed)
let users = [];
let orders = [];
let restaurants = [];
let staff = [];
let partners = [];

// -------------------- AUTH ROUTES --------------------

// Register user
app.post("/api/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const existing = users.find((u) => u.username === username);
  if (existing) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: users.length + 1,
    username,
    password: hashedPassword,
    role,
  };
  users.push(newUser);

  res.json({ message: "User registered successfully" });
});

// Login user
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, role: user.role });
});

// -------------------- ORDER ROUTES --------------------

// Create order
app.post("/api/orders", (req, res) => {
  const order = { id: orders.length + 1, ...req.body, status: "pending" };
  orders.push(order);
  res.json(order);
});

// Get all orders
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// -------------------- RESTAURANT ROUTES --------------------

// Add restaurant
app.post("/api/restaurants", (req, res) => {
  const restaurant = { id: restaurants.length + 1, ...req.body };
  restaurants.push(restaurant);
  res.json(restaurant);
});

// Get all restaurants
app.get("/api/restaurants", (req, res) => {
  res.json(restaurants);
});

// -------------------- STAFF ROUTES --------------------

// Add staff
app.post("/api/staff", (req, res) => {
  const member = { id: staff.length + 1, ...req.body };
  staff.push(member);
  res.json(member);
});

// Get staff
app.get("/api/staff", (req, res) => {
  res.json(staff);
});

// -------------------- PARTNER ROUTES --------------------

// Add partner
app.post("/api/partners", (req, res) => {
  const partner = { id: partners.length + 1, ...req.body };
  partners.push(partner);
  res.json(partner);
});

// Get partners
app.get("/api/partners", (req, res) => {
  res.json(partners);
});

// -------------------- FRONTEND (React) --------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve React build (dist folder)
app.use(express.static(path.join(__dirname, "dist")));

// Handle React Router (SPA fallback)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// -------------------- START SERVER --------------------

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
