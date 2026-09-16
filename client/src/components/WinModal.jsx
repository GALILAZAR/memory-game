import { useAuth } from '../context/AuthContext';
import { GAME_STATUS } from '../data/cards';

/**
 * WinModal — Victory and Game Over modal.
 *
 * Shows game completion stats and action buttons.
 * Offers score submission for authenticated users.
 *
 * Props:
 *  - gameStatus: string — WON or GAME_OVER
 *  - moves: number
 *  - time: number (seconds)
 *  - formatTime: Function
 *  - pairsFound: number
 *  - totalPairs: number
 *  - rating: number (1-3)
 *  - onRestart: Function
 *  - onSubmitScore: Function
 *  - scoreSubmitted: boolean
 *  - submittingScore: boolean
 */
const WinModal = ({
  gameStatus,
  moves,
  time,
  formatTime,
  pairsFound,
  totalPairs,
  rating,
  onRestart,
  onSubmitScore,
  scoreSubmitted,
  submittingScore,
}) => {
  const { isAuthenticated } = useAuth();

  if (gameStatus !== GAME_STATUS.WON && gameStatus !== GAME_STATUS.GAME_OVER) {
    return null;
  }

  const isWin = gameStatus === GAME_STATUS.WON;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 3; i++) {
      stars.push(
        <span
          key={i}
          className={`modal-star ${i <= rating ? 'modal-star--filled' : ''}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={isWin ? 'Victory' : 'Game Over'}>
      <div className="modal win-modal">
        <div className={`modal__badge ${isWin ? 'modal__badge--win' : 'modal__badge--lose'}`}>
          {isWin ? '🏆' : '💀'}
        </div>

        <h2 className="modal__title">
          {isWin ? 'CONGRATULATIONS!' : 'GAME OVER'}
        </h2>
        <p className="modal__subtitle">
          {isWin
            ? 'You found all pairs, Vault Dweller!'
            : 'Move limit exceeded. Better luck next time!'}
        </p>

        {/* Stats */}
        <div className="modal__stats">
          <div className="modal__stat">
            <span className="modal__stat-label">TIME</span>
            <span className="modal__stat-value">{formatTime(time)}</span>
          </div>
          <div className="modal__stat">
            <span className="modal__stat-label">MOVES</span>
            <span className="modal__stat-value">{moves}</span>
          </div>
          <div className="modal__stat">
            <span className="modal__stat-label">PAIRS</span>
            <span className="modal__stat-value">
              {pairsFound} / {totalPairs}
            </span>
          </div>
          <div className="modal__stat">
            <span className="modal__stat-label">RATING</span>
            <span className="modal__stat-value modal__stat-stars">
              {renderStars(rating)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="modal__actions">
          <button
            className="control-btn control-btn--primary"
            onClick={onRestart}
            id="btn-play-again"
          >
            ↻ PLAY AGAIN
          </button>

          {isWin && isAuthenticated && !scoreSubmitted && (
            <button
              className="control-btn control-btn--success"
              onClick={onSubmitScore}
              disabled={submittingScore}
              id="btn-submit-score"
            >
              {submittingScore ? 'SAVING...' : '📊 SAVE SCORE'}
            </button>
          )}

          {isWin && !isAuthenticated && (
            <p className="modal__login-hint">
              Login to save your score to the leaderboard!
            </p>
          )}

          {scoreSubmitted && (
            <p className="modal__success">✓ Score saved to leaderboard!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WinModal;
