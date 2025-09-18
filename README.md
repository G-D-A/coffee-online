# ☕ CoffeeOnline — Menu, Orders, Admin

A web platform for a coffee shop: public menu with photos and prices, cart and pre‑orders, and a simple admin panel to manage the menu. The system consists of a **backend API** and a **frontend**.

---

## 🔧 Stack

### Backend (`/coffeeonline_api`)
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT Auth
- Yup (validation)
- tsyringe (DI)
- Jest + Supertest (tests)

### Frontend (`/web`)
- React + TypeScript
- Redux Toolkit
- Axios
- Tailwind CSS
- React Router
- Jest + RTL

---

## 🔐 Features

- 👤 User registration & login
- 📋 Public menu (GET /api/menu)
- 🛍️ Admin CRUD for menu items
- 🛒 Cart with quantity control
- ✅ Checkout (place pre‑orders)
- 📦 Order history
- 👑 Roles: admin/user (CRUD menu — admin only)
- 🔐 Security: JWT, password hashing (bcrypt)
- 🧪 Unit + integration tests

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- MongoDB (MONGO_URI), e.g. `mongodb://localhost:27017/coffee-online`

### 1. Backend
```bash
cd coffeeonline_api
npm install
npm run dev
```
API runs at http://localhost:3000

### 2. Web (Frontend)
```bash
cd web
npm install
npm start
```
React app at http://localhost:3001

Public endpoints: `GET /api/menu`, `GET /api/menu/:id`. Mutations are admin‑only.

