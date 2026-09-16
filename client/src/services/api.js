import axios from 'axios';

/**
 * Axios instance configured for the Vault-Tec API.
 * Automatically attaches JWT token from localStorage to all requests.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor — attaches auth token to every request.
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('vt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor — handles 401 (unauthorized) globally.
 * Clears invalid tokens and redirects to login if needed.
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid — clear auth state
      localStorage.removeItem('vt_token');
      localStorage.removeItem('vt_user');
    }
    return Promise.reject(error);
  }
);

export default api;
