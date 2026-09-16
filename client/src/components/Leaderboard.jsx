import { useState, useEffect, useCallback } from 'react';
import scoreService from '../services/scoreService';

/**
 * Leaderboard component — Displays ranked scores with export/share/clear.
 *
 * Features:
 * - Fetches scores from backend
 * - Filters by difficulty
 * - Export to CSV
 * - Share via navigator.share
 * - Clear filters (local state only)
 */
const Leaderboard = ({ difficulty }) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');

  /**
   * Fetch leaderboard data from backend.
   */
  const fetchScores = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await scoreService.getLeaderboard(filter || undefined);
      setScores(data.scores || []);
    } catch (err) {
      // If backend is not available, show empty state
      setScores([]);
      setError(null); // Don't show error for missing backend
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  /**
   * Format seconds to MM:SS.
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  /**
   * Render star rating.
   */
  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(3 - rating);
  };

  /**
   * Export leaderboard data as CSV.
   * No backend required — generates from current data.
   */
  const handleExport = () => {
    if (scores.length === 0) return;

    const header = 'Rank,Player,Difficulty,Moves,Time,Rating\n';
    const rows = scores
      .map(
        (s) =>
          `${s.rank},${s.player},${s.difficulty},${s.moves},${formatTime(s.time)},${renderStars(s.rating)}`
      )
      .join('\n');

    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vault-tec-leaderboard-${filter || 'all'}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  /**
   * Share scores using navigator.share API.
   * Shows fallback message if unavailable.
   */
  const handleShare = async () => {
    const shareText =
      scores.length > 0
        ? `🏆 Vault-Tec Memory Game Leaderboard\n\n${scores
            .slice(0, 5)
            .map(
              (s) =>
                `#${s.rank} ${s.player} — ${s.moves} moves, ${formatTime(s.time)}, ${renderStars(s.rating)}`
            )
            .join('\n')}`
        : 'Challenge me at the Vault-Tec Memory Game!';

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Vault-Tec Memory Game',
          text: shareText,
        });
      } catch {
        // User cancelled sharing
      }
    } else {
      alert('Sharing is not supported on this browser. Copy the leaderboard data manually!');
    }
  };

  /**
   * Clear filters (local UI state only — does NOT delete database records).
   */
  const handleClear = () => {
    setFilter('');
  };

  return (
    <div className="leaderboard" id="leaderboard-section">
      <h3 className="leaderboard__title">LEADERBOARD</h3>

      {/* Difficulty Filter */}
      <div className="leaderboard__filters">
        <button
          className={`filter-btn ${filter === '' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'easy' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('easy')}
        >
          Easy
        </button>
        <button
          className={`filter-btn ${filter === 'medium' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('medium')}
        >
          Med
        </button>
        <button
          className={`filter-btn ${filter === 'hard' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('hard')}
        >
          Hard
        </button>
      </div>

      {/* Scores List */}
      <div className="leaderboard__list">
        {loading && <p className="leaderboard__empty">Loading...</p>}
        {!loading && scores.length === 0 && (
          <p className="leaderboard__empty">No records yet.</p>
        )}
        {!loading &&
          scores.map((score) => (
            <div key={`${score.rank}-${score.player}-${score.time}`} className="leaderboard__entry">
              <span className="leaderboard__rank">#{score.rank}</span>
              <div className="leaderboard__details">
                <span className="leaderboard__player">{score.player}</span>
                <span className="leaderboard__meta">
                  {score.difficulty.toUpperCase()} · {score.moves} moves · {formatTime(score.time)}
                </span>
                <span className="leaderboard__stars">{renderStars(score.rating)}</span>
              </div>
            </div>
          ))}
      </div>

      {/* Action Buttons */}
      <div className="leaderboard__actions">
        <button
          className="lb-action-btn"
          onClick={fetchScores}
          id="btn-highscores"
        >
          🏆 HIGH SCORES
        </button>
        <button
          className="lb-action-btn"
          onClick={handleExport}
          disabled={scores.length === 0}
          id="btn-export"
        >
          📥 EXPORT
        </button>
        <button
          className="lb-action-btn"
          onClick={handleShare}
          id="btn-share"
        >
          📤 SHARE
        </button>
        <button
          className="lb-action-btn"
          onClick={handleClear}
          id="btn-clear"
        >
          🗑 CLEAR
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
