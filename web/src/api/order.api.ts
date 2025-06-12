import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const createOrder = (userId: string, productIds: string[], token: string) =>
  API.post('/orders', { userId, productIds }, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getOrdersByUser = (userId: string, token: string) =>
  API.get(`/orders/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
