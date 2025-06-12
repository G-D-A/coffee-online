import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const getCart = (token: string) =>
  API.get('/cart', {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addToCart = (productId: string, quantity: number, token: string) =>
  API.post('/cart/add', { productId, quantity }, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const removeFromCart = (productId: string, token: string) =>
  API.delete(`/cart/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const checkoutCart = (token: string) =>
  API.post('/cart/checkout', {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
