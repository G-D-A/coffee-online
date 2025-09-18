import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const fetchProducts = () => API.get('/menu');
export const getProductById = (id: string) => API.get(`/menu/${id}`);

export const createProduct = (data: any, token: string) =>
  API.post('/menu', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProduct = (id: string, data: any, token: string) =>
  API.post(`/menu/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProduct = (id: string, token: string) =>
  API.delete(`/menu/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
