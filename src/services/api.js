import axios from 'axios';
import { message } from 'antd';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      // Handle different HTTP status codes
      switch (error.response.status) {
        case 401:
          message.error('Unauthorized - Please login again');
          break;
        case 403:
          message.error('Forbidden - You don\'t have permission');
          break;
        case 404:
          message.error('Resource not found');
          break;
        case 500:
          message.error('Server error - Please try again later');
          break;
        default:
          message.error(error.response.data.message || 'An error occurred');
      }
    } else if (error.request) {
      message.error('Network error - Please check your connection');
    } else {
      message.error('Request error - Please try again');
    }
    return Promise.reject(error);
  }
);

export default api;