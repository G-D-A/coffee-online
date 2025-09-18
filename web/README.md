# CoffeeOnline Web (Frontend)

## Overview

This is the **React frontend** for CoffeeOnline. It allows users to:

- Register and log in
- View public coffee menu
- Add products to the cart
- Remove products from the cart
- Checkout and place orders
- View order history
- View and manage profile

Admin users can also:

- Admin: add/edit/delete menu items

> 💡 The app is built as an SPA using **React + TypeScript**, and styled with **Tailwind CSS**.

---

## 🚀 Tech Stack

- **React** + **TypeScript**
- **Redux Toolkit** — global state management
- **Axios** — API calls
- **React Router** — routing
- **Tailwind CSS** — styling
- **CRA (Create React App)** — base template

---

## 📂 Project Structure
```aiignore
web/
├── public/
├── src/
│   ├── api/                # Axios API functions
│   ├── assets/             # Assets (images)
│   ├── components/         # UI components (Header, Footer, Cards, etc.)
│   ├── features/           # Redux slices: auth, cart, product, order
│   ├── pages/              # Page components for each route
│   ├── store/index.ts      # Redux store config
│   └── App.tsx             # Main routing logic
└── tailwind.config.js      # Tailwind setup

```

## ✅ Prerequisites

- **Node.js** 22+
- **Backend** at `http://localhost:3000` (or change `baseURL` in `src/api/*.ts`)
---

## 🛠️ How to Run Locally

1. **Install dependencies:**

```bash
npm install
npm start
```
Starts the development server on the http://localhost:3001

## Notes
- JWT token is stored in localStorage
- Protected routes are guarded via ProtectedRoute component
- Admin controls (/menu/new, /menu/:id/edit) require auth
