# 🛒 Online Store — Fullstack App

A full-featured e-commerce application with separate **backend API** and **frontend client**, built using modern technologies.

---

## 🔧 Stack

### Backend (`/api`)
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
- 🛍️ Product catalog (CRUD)
- 🛒 Cart with quantity control
- ✅ Checkout flow
- 📦 Order history
- 👑 Admin: create/edit/delete products
- 🔐 Protected routes using JWT
- 🧪 Unit + integration tests

---

## 🚀 How to Run

### Prerequisites
- Node.js 20+
- MongoDB running on `mongodb://localhost:27017/online-store`

### 1. Backend
```bash
cd api
npm install
npm run dev
```
Runs API on http://localhost:3000

### Web (Frontend)
```bash
cd web
npm install
npm start
```
Runs React app on http://localhost:3001

