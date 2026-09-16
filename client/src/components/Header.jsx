import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

/**
 * Header component — Top navigation bar.
 *
 * Shows:
 * - App branding
 * - User status (logged in / guest)
 * - Login/Register/Logout buttons
 */
const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuth(true);
  };

  const handleRegister = () => {
    setAuthMode('register');
    setShowAuth(true);
  };

  return (
    <>
      <header className="header" role="banner">
        <div className="header__brand">
          <span className="header__logo">⚙</span>
          <span className="header__title">VAULT-TEC</span>
        </div>

        <nav className="header__nav" aria-label="User navigation">
          {isAuthenticated ? (
            <div className="header__user">
              <span className="header__username">
                👤 {user?.name || 'Dweller'}
              </span>
              <button
                className="header__btn header__btn--logout"
                onClick={logout}
                id="btn-logout"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <div className="header__auth">
              <button
                className="header__btn header__btn--login"
                onClick={handleLogin}
                id="btn-login"
              >
                LOGIN
              </button>
              <button
                className="header__btn header__btn--register"
                onClick={handleRegister}
                id="btn-register"
              >
                REGISTER
              </button>
            </div>
          )}
        </nav>
      </header>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;
