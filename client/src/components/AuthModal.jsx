import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

/**
 * AuthModal — Login/Register modal overlay.
 *
 * Props:
 *  - isOpen: boolean — Whether the modal is visible
 *  - onClose: Function — Called to close the modal
 *  - initialMode: 'login' | 'register' — Which form to show first
 */
const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setSubmitting(true);

    try {
      if (mode === 'login') {
        await login({ email: formData.email, password: formData.password });
      } else {
        if (!formData.name.trim()) {
          setFormError('Name is required');
          setSubmitting(false);
          return;
        }
        await register(formData);
      }
      onClose();
    } catch (err) {
      setFormError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setFormError('');
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <h2 className="modal__title">
          {mode === 'login' ? 'VAULT-TEC LOGIN' : 'VAULT-TEC REGISTER'}
        </h2>
        <p className="modal__subtitle">
          {mode === 'login'
            ? 'Access your Vault-Tec account'
            : 'Create your Vault-Tec identity'}
        </p>

        {formError && <div className="modal__error">{formError}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="auth-name">NAME</label>
              <input
                id="auth-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Vault Dweller"
                required
                autoComplete="name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="auth-email">EMAIL</label>
            <input
              id="auth-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="dweller@vault-tec.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="auth-password">PASSWORD</label>
            <input
              id="auth-password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          <button
            type="submit"
            className="control-btn control-btn--primary auth-submit"
            disabled={submitting}
            id="btn-auth-submit"
          >
            {submitting
              ? 'PROCESSING...'
              : mode === 'login'
                ? 'LOGIN'
                : 'REGISTER'}
          </button>
        </form>

        <p className="auth-toggle">
          {mode === 'login' ? "Don't have an account? " : 'Already registered? '}
          <button
            className="auth-toggle__btn"
            onClick={toggleMode}
            type="button"
          >
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
