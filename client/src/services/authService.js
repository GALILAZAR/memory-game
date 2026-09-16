import api from './api';

/**
 * Authentication API service.
 * Handles registration, login, and profile fetching.
 */
const authService = {
  /**
   * Register a new user.
   * @param {{ name: string, email: string, password: string }} data
   * @returns {Promise<{ token: string, user: object }>}
   */
  register: async (data) => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  /**
   * Login with email and password.
   * @param {{ email: string, password: string }} data
   * @returns {Promise<{ token: string, user: object }>}
   */
  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  /**
   * Get the current user's profile.
   * Requires a valid JWT token in localStorage.
   * @returns {Promise<{ user: object }>}
   */
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default authService;
