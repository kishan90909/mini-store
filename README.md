# 🛍️ MiniStore - Modern E-Commerce Platform

<div align="center">
  <h3>
    🚀 Live Demo: 
    <a href="kishan001-ministore.netlify.app">
      View Application Here
    </a>
  </h3>
</div>

<div align="center">

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-green?logo=nodedotjs)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange?logo=mysql)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen)

</div>

---

### 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation & Setup](#-installation--setup)
- [💻 Usage Guide](#-usage-guide)
- [🎨 Design System](#-design-system)
- [📡 API Documentation](#-api-documentation)
- [📞 Contact & Support](#-contact--support)

---

```markdown
# 🛍️ MiniStore - Modern E-Commerce Platform

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![NodeJS](https://img.shields.io/badge/Backend-Node.js-green?logo=nodedotjs)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange?logo=mysql)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC?logo=tailwind-css)
![Status](https://img.shields.io/badge/Status-Active_Development-brightgreen)

### 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Installation & Setup](#-installation--setup)
- [💻 Usage Guide](#-usage-guide)
- [🎨 Design System](#-design-system)
- [📡 API Documentation](#-api-documentation)
- [📞 Contact & Support](#-contact--support)

---

## 🌟 Overview

**MiniStore** is a robust, full-stack e-commerce application engineered to provide a seamless shopping experience. Built on the **PERN/MERN philosophy** (using MySQL), this single-page application bridges the gap between high-end aesthetics and complex backend logic.

It features a sophisticated frontend with **glassmorphism effects**, real-time state management, and a secure RESTful API backed by a relational database. This project demonstrates advanced proficiency in full-stack development, database management, and UI/UX design.

---

## ✨ Key Features

### 🎨 **Modern Frontend Experience**
* **Dynamic Filtering Engine:** Real-time product discovery combining Search, Category filtering, and Price sorting.
* **Glassmorphism UI:** Trendy, translucent design elements with background blur effects.
* **Micro-Interactions:** Smooth fade-ins, hover lifts, and button glows powered by CSS animations.
* **Responsive Layout:** Mobile-first architecture ensuring perfect rendering from 320px to 4K screens.

### 🛒 **E-Commerce Functionality**
* **Smart Cart System:** Persistent shopping cart with real-time total calculation and quantity adjustments.
* **Secure Checkout:** Simulated payment process with auto-filling user details.
* **User Dashboard:** dedicated profile section to view account details and **Order History**.

### 🔐 **Security & Backend**
* **JWT Authentication:** Stateless authentication using JSON Web Tokens.
* **Password Hashing:** Secure credential storage.
* **Relational Data Integrity:** Normalized MySQL schema linking Users, Products, and Orders.

---

## 🛠️ Technology Stack

### 🎨 **Frontend**

| Tech | Usage |
| :--- | :--- |
| **React.js** | Component-based UI architecture |
| **Tailwind CSS** | Utility-first styling & responsive design |
| **Context API** | Global state management (Auth & Cart) |
| **Axios** | Promise-based HTTP client |
| **React Router** | Client-side routing |

### ⚙️ **Backend**

| Tech | Usage |
| :--- | :--- |
| **Node.js** | Server-side runtime environment |
| **Express.js** | RESTful API framework |
| **MySQL** | Relational database management |
| **JsonWebToken** | Secure user authentication |
| **Cors** | Cross-Origin Resource Sharing |

---

## 📁 Project Structure

```bash
MiniStore/
├── client/                 # Frontend Application
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, Cards)
│   │   ├── context/        # Global State Logic
│   │   ├── pages/          # Views (Home, Profile, Checkout)
│   │   ├── index.css       # Tailwind & Custom Animations
│   │   └── App.jsx         # Main Router
│   └── package.json
│
├── server/                 # Backend Application
│   ├── config/             # Database Connection
│   ├── controllers/        # Business Logic (Auth, Products)
│   ├── routes/             # API Endpoint Definitions
│   ├── server.js           # Server Entry Point
│   └── package.json
│
└── README.md               # Documentation

```

---

## 🚀 Installation & Setup

### 📋 Prerequisites

* **Node.js** (v14+)
* **MySQL Server** (Workbench or Command Line)
* **Git**

### 🛠️ Step 1: Database Setup

Execute the following SQL script in MySQL Workbench to initialize the schema:

```sql
CREATE DATABASE IF NOT EXISTS mini_store;
USE mini_store;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- 2. Products Table
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    image_url TEXT
);

-- 3. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

```

### 🛠️ Step 2: Backend Setup

```bash
# Navigate to server
cd server

# Install dependencies
npm install

# Configure Database
# Open server/config/db.js and update your MySQL password

# Start Server
npm start
# Server runs on [http://127.0.0.1:5000](http://127.0.0.1:5000)

```

### 🛠️ Step 3: Frontend Setup

```bash
# Open a new terminal and navigate to client
cd client

# Install dependencies
npm install

# Start Application
npm start
# App runs on http://localhost:3000

```

---

## 💻 Usage Guide

1. **Browsing:** Use the **Search Bar** or **Category Dropdown** on the Home page to filter products.
2. **Account:** Click "Login" to access the authentication page. Register a new account.
3. **Shopping:** Add items to the cart. The cart icon updates instantly.
4. **Checkout:** Proceed to checkout. If logged in, your details (Name/Email) are auto-filled.
5. **History:** Visit the **Profile** page to see your past orders and status.

---

## 🎨 Design System

**Typography:**

* Primary Font: **Plus Jakarta Sans** (Modern, geometric, legible).

**Color Palette:**

* 🎨 **Primary Blue:** `#2563eb` (Trust, Action buttons)
* 🌑 **Slate Dark:** `#0f172a` (Headings, Hero section)
* 🌫️ **Slate Light:** `#f8fafc` (Backgrounds)
* 🔸 **Amber:** `#f59e0b` (Search interaction accents)

**UI Principles:**

* **Glassmorphism:** Navigation bars use `backdrop-filter: blur(10px)`.
* **Cards:** Clean white cards with soft shadows `shadow-sm` that lift on hover `shadow-lg`.

---

## 📡 API Documentation

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/api/products` | Retrieve all products |
| **POST** | `/api/auth/register` | Create new user account |
| **POST** | `/api/auth/login` | Authenticate & receive Token |
| **POST** | `/api/orders` | Place a new order |
| **GET** | `/api/orders/user/:id` | Fetch user-specific order history |

---

## 📞 Contact & Support

**Kishan Patel**

* 📧 Email: [kpatel.tech.mca@gmail.com](mailto:kpatel.tech.mca@gmail.com)
* 💼 LinkedIn: [kishan patel](https://https://www.linkedin.com/in/kishan-patel-597792329/)
* 🐱 GitHub: [kishan90909](https://github.com/kishan90909)

I am actively seeking **Software Engineering** and **Full-Stack Development** opportunities. If you find this project interesting, let's connect!

---

*Built with ❤️ by kishan patel | 2026*

```

```
