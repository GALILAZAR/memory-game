import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import scoreService from '../services/scoreService';

/**
 * Profile page — Shows user info and personal score history.
 */
const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchScores = async () => {
      try {
        const data = await scoreService.getMyScores();
        setScores(data.scores || []);
      } catch {
        setScores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [isAuthenticated, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(3 - rating);

  if (!isAuthenticated) return null;

  return (
    <div className="auth-page">
      <div className="profile-card">
        <h1 className="auth-card__title">VAULT DWELLER PROFILE</h1>

        <div className="profile__info">
          <div className="profile__avatar">👤</div>
          <div className="profile__details">
            <h2 className="profile__name">{user?.name}</h2>
            <p className="profile__email">{user?.email}</p>
          </div>
        </div>

        <div className="profile__scores">
          <h3 className="profile__section-title">YOUR GAME HISTORY</h3>

          {loading && <p className="leaderboard__empty">Loading scores...</p>}

          {!loading && scores.length === 0 && (
            <p className="leaderboard__empty">
              No completed games yet. Go play!
            </p>
          )}

          {!loading && scores.length > 0 && (
            <div className="profile__score-list">
              {scores.map((score) => (
                <div key={score.id} className="profile__score-entry">
                  <div className="profile__score-difficulty">
                    {score.difficulty.toUpperCase()}
                  </div>
                  <div className="profile__score-details">
                    <span>{score.moves} moves</span>
                    <span>{formatTime(score.time)}</span>
                    <span>{renderStars(score.rating)}</span>
                  </div>
                  <div className="profile__score-date">
                    {new Date(score.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="profile__actions">
          <Link to="/" className="control-btn control-btn--primary">
            ← BACK TO GAME
          </Link>
          <button
            className="control-btn control-btn--warning"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
