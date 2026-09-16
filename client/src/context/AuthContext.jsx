import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

/**
 * AuthContext — Provides authentication state and methods to all components.
 *
 * Features:
 * - Persists auth state in localStorage
 * - Auto-restores user session on page load
 * - Provides login, register, and logout methods
 */
const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Restore auth state from localStorage on mount.
   */
  useEffect(() => {
    const savedToken = localStorage.getItem('vt_token');
    const savedUser = localStorage.getItem('vt_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch {
        // Corrupted data — clear it
        localStorage.removeItem('vt_token');
        localStorage.removeItem('vt_user');
      }
    }
    setLoading(false);
  }, []);

  /**
   * Register a new user.
   * @param {{ name: string, email: string, password: string }} data
   */
  const register = useCallback(async (data) => {
    setError(null);
    setLoading(true);
    try {
      const result = await authService.register(data);
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem('vt_token', result.token);
      localStorage.setItem('vt_user', JSON.stringify(result.user));
      return result;
    } catch (err) {
      const message =
        err.response?.data?.message || 'Registration failed. Please try again.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Login with email and password.
   * @param {{ email: string, password: string }} data
   */
  const login = useCallback(async (data) => {
    setError(null);
    setLoading(true);
    try {
      const result = await authService.login(data);
      setToken(result.token);
      setUser(result.user);
      localStorage.setItem('vt_token', result.token);
      localStorage.setItem('vt_user', JSON.stringify(result.user));
      return result;
    } catch (err) {
      const message =
        err.response?.data?.message || 'Login failed. Check your credentials.';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout — clears all auth state and localStorage.
   */
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setError(null);
    localStorage.removeItem('vt_token');
    localStorage.removeItem('vt_user');
  }, []);

  /**
   * Clear any auth errors.
   */
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated: !!token && !!user,
    register,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
