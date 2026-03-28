import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Articles
export const getArticles = (params = {}) => api.get('/api/articles', { params });
export const getAllArticles = () => api.get('/api/articles/all');
export const getArticle = (id) => api.get(`/api/articles/${id}`);
export const createArticle = (data) => api.post('/api/articles', data);
export const updateArticle = (id, data) => api.put(`/api/articles/${id}`, data);
export const deleteArticle = (id) => api.delete(`/api/articles/${id}`);

// Likes & Comments
export const likeArticle = (id) => api.post(`/api/articles/${id}/like`);
export const addComment = (id, data) => api.post(`/api/articles/${id}/comments`, data);
export const getComments = (id) => api.get(`/api/articles/${id}/comments`);

// Categories & Tags
export const getCategories = () => api.get('/api/categories');
export const createCategory = (data) => api.post('/api/categories', data);
export const getTags = () => api.get('/api/tags');

export default api;
