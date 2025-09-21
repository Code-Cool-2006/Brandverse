
---

# 🍽️ Hackathon Project: Smart Food Ordering Platform

## 📅 Development Log Overview

This project was built during a two-day hackathon focused on creating a smart, health-conscious food ordering platform with immersive features and real-time data sync.

---

## 🚀 Day 1: Application Startup & Core Features

### 🔐 Authentication & Landing Page
- **Landing Page** with login options for:
  - User
  - Staff
  - Delivery
- **Secure Authentication** using JSON Web Tokens (JWT) across all modules.

### 🧭 User Dashboard Structure
- **Main Dashboard** includes:
  - Navigation header
  - Search bar
  - Grid layout for food items
- **Rapid Prototyping**: All components and styling consolidated into a single React file.

### 🛒 Shopping Cart & Checkout
- **Cart Panel** on the right side of the dashboard.
- Features:
  - "+" button to add items
  - Auto-calculated subtotal
  - **Checkout Page** with:
    - Itemized order summary
    - Total price before placement

### 🩺 Diabetic-Friendly Filtering
- **"Diabetic" Tab** in navigation.
- Filters food grid to show curated diabetic-friendly options.

### 🍽️ Restaurant & Menu Browsing
- **"Restaurants" Tab**:
  - Displays restaurant cards
  - Clicking opens specific menus
  - "Back to Restaurants" button for easy navigation

### 🧠 Gemini's Nutritional Insights
- Each food item includes a **"Gemini's Insights"** button.
- Calls Gemini API for AI-powered nutritional summaries.

---

## 🛠️ Day 2: UI Refinement & Advanced Features

### 🎨 UI/UX Enhancements
- Improved visual hierarchy and alignment.
- Refined:
  - Grid layout
  - Buttons
  - Navigation header
- **Bug Fixes**:
  - Cart subtotal miscalculations
  - Navigation state issues
  - Mobile responsiveness glitches

### 🔄 Live Restaurant Data Sync
- **Restaurant Owners** can upload:
  - Menu items (name, price, category, dietary flags)
  - Availability status (in/out of stock)
- **Real-Time Updates** reflected instantly on customer dashboard.

### 🛍️ Grocery Shopping (Owner Module)
- **Grocery Page** for restaurant owners:
  - Browse essentials (vegetables, dairy, grains)
  - Add to grocery cart
  - Place restocking orders
- Orders linked to restaurant profile.
- Hidden from customer view.


---

## ✅ Summary

Day 1 focused on building the core structure and essential features.  
Day 2 refined the UI, stabilized functionality, and introduced advanced modules like:
- Real-time restaurant data sync
- Grocery shopping for owners

---

