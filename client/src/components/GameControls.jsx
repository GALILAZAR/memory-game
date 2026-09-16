import { GAME_STATUS } from '../data/cards';

/**
 * GameControls — Control buttons for the game.
 *
 * Includes:
 * - Restart button
 * - Reveal 1 Pair button (with remaining count)
 * - Pause / Resume toggle
 * - Move Limit toggle
 */
const GameControls = ({
  gameStatus,
  revealsLeft,
  showMoveLimit,
  moveLimit,
  onRestart,
  onRevealPair,
  onPause,
  onResume,
  onToggleMoveLimit,
}) => {
  const isPaused = gameStatus === GAME_STATUS.PAUSED;
  const isPlaying = gameStatus === GAME_STATUS.PLAYING;
  const isFinished =
    gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.GAME_OVER;

  return (
    <div className="game-controls">
      {/* Move Limit Toggle */}
      <label className="control-checkbox" id="move-limit-toggle">
        <input
          type="checkbox"
          checked={showMoveLimit}
          onChange={onToggleMoveLimit}
          aria-label="Enable move limit"
        />
        <span className="control-checkbox__label">
          ENABLE MOVE LIMIT
          {showMoveLimit && (
            <span className="control-checkbox__detail"> (max {moveLimit})</span>
          )}
        </span>
      </label>

      {/* Action Buttons */}
      <div className="controls-grid">
        <button
          className="control-btn control-btn--primary"
          onClick={onRestart}
          id="btn-restart"
          aria-label="Restart game"
        >
          ↻ RESTART
        </button>

        <button
          className="control-btn control-btn--secondary"
          onClick={onRevealPair}
          disabled={revealsLeft <= 0 || isFinished}
          id="btn-reveal"
          aria-label={`Reveal one pair. ${revealsLeft} reveals remaining`}
        >
          👁 REVEAL ({revealsLeft})
        </button>

        {isPlaying && (
          <button
            className="control-btn control-btn--warning"
            onClick={onPause}
            id="btn-pause"
            aria-label="Pause game"
          >
            ⏸ PAUSE
          </button>
        )}

        {isPaused && (
          <button
            className="control-btn control-btn--success"
            onClick={onResume}
            id="btn-resume"
            aria-label="Resume game"
          >
            ▶ RESUME
          </button>
        )}
      </div>
    </div>
  );
};

export default GameControls;
