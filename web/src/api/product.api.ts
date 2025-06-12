import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchProducts = (token: string) =>
  API.get('/products', {
    headers: { Authorization: `Bearer ${token}` },
  });
export const getProductById = (id: string, token: string) =>
  API.get(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const createProduct = (data: any, token: string) =>
  API.post('/products', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProduct = (id: string, data: any, token: string) =>
  API.post(`/products/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProduct = (id: string, token: string) =>
  API.delete(`/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
