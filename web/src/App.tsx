import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import ProductFormPage from './pages/ProductFormPage';
import AuthRequiredPage from './pages/AuthRequiredPage';
import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from './features/auth/authSlice';
import { RootState, AppDispatch } from './store';
import { getCart } from './api/cart.api';
import { setCart } from './features/cart/cartSlice';


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchProfile(token));
      getCart(token)
        .then((res) => {
          const items = res.data?.items || [];
          dispatch(setCart(items as any));
        })
        .catch(() => {
        });
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/menu" element={<ProductsPage />} />
            <Route path="/menu/:id" element={<ProductDetailsPage />} />
            <Route path="/menu/new" element={
              <AdminRoute>
                <ProductFormPage />
              </AdminRoute>
            } />
            <Route path="/menu/:id/edit" element={
              <AdminRoute>
                <ProductFormPage />
              </AdminRoute>
            } />
            <Route path="/cart" element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />
            <Route path="/auth/required" element={<AuthRequiredPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
