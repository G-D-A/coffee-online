import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const register = (email: string, password: string) =>
  API.post('/users/register', { email, password });

export const login = (email: string, password: string) =>
  API.post('/users/login', { email, password });

export const getProfile = (token: string) =>
  API.get('/users/profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
