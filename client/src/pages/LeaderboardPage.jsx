import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import scoreService from '../services/scoreService';

/**
 * LeaderboardPage — Full-page leaderboard view.
 */
const LeaderboardPage = () => {
  const [scores, setScores] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const data = await scoreService.getLeaderboard(filter || undefined);
        setScores(data.scores || []);
      } catch {
        setScores([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [filter]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const renderStars = (rating) => '★'.repeat(rating) + '☆'.repeat(3 - rating);

  return (
    <div className="auth-page">
      <div className="profile-card leaderboard-page">
        <h1 className="auth-card__title">🏆 VAULT-TEC LEADERBOARD</h1>
        <p className="auth-card__subtitle">Top scores across all vaults</p>

        <div className="leaderboard__filters" style={{ justifyContent: 'center', margin: '1.5rem 0' }}>
          {['', 'easy', 'medium', 'hard'].map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'filter-btn--active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f ? f.charAt(0).toUpperCase() + f.slice(1) : 'All'}
            </button>
          ))}
        </div>

        {loading && <p className="leaderboard__empty">Loading leaderboard...</p>}

        {!loading && scores.length === 0 && (
          <p className="leaderboard__empty">
            No scores recorded yet. Be the first!
          </p>
        )}

        {!loading && scores.length > 0 && (
          <div className="leaderboard-table">
            <div className="leaderboard-table__header">
              <span>#</span>
              <span>Player</span>
              <span>Difficulty</span>
              <span>Moves</span>
              <span>Time</span>
              <span>Rating</span>
            </div>
            {scores.map((score) => (
              <div
                key={`${score.rank}-${score.player}`}
                className={`leaderboard-table__row ${
                  score.rank <= 3 ? `leaderboard-table__row--top${score.rank}` : ''
                }`}
              >
                <span className="leaderboard-table__rank">
                  {score.rank <= 3
                    ? ['🥇', '🥈', '🥉'][score.rank - 1]
                    : score.rank}
                </span>
                <span className="leaderboard-table__player">{score.player}</span>
                <span className="leaderboard-table__diff">
                  {score.difficulty.toUpperCase()}
                </span>
                <span>{score.moves}</span>
                <span>{formatTime(score.time)}</span>
                <span className="leaderboard-table__stars">
                  {renderStars(score.rating)}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="profile__actions" style={{ marginTop: '2rem' }}>
          <Link to="/" className="control-btn control-btn--primary">
            ← BACK TO GAME
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
