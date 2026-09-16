import Card from './Card';
import DifficultySelector from './DifficultySelector';
import { DIFFICULTIES, GAME_STATUS } from '../data/cards';

/**
 * GameBoard component — The main game area with card grid.
 *
 * Contains:
 * - Game instruction text
 * - Difficulty selector
 * - Mute / Play Demo buttons
 * - Card grid (dynamic layout based on difficulty)
 * - Restart Game button
 * - Pause overlay
 */
const GameBoard = ({ game }) => {
  const {
    cards,
    flippedCards,
    matchedCards,
    difficulty,
    gameStatus,
    isMuted,
    isDemo,
    flipCard,
    changeDifficulty,
    toggleMute,
    playDemo,
    restartGame,
  } = game;

  const config = DIFFICULTIES[difficulty];
  const isPaused = gameStatus === GAME_STATUS.PAUSED;
  const isFinished =
    gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.GAME_OVER;

  return (
    <main className="game-board" role="main" aria-label="Game board">
      {/* Top Controls */}
      <div className="game-board__header">
        <p className="game-board__instruction">
          Find all pairs — Good luck, Vault Dweller.
        </p>

        <div className="game-board__controls">
          <DifficultySelector
            difficulty={difficulty}
            onChange={changeDifficulty}
            disabled={isDemo}
          />

          <div className="game-board__buttons">
            <button
              className={`icon-btn ${isMuted ? 'icon-btn--active' : ''}`}
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              id="btn-mute"
            >
              {isMuted ? '🔇' : '🔊'} {isMuted ? 'UNMUTE' : 'MUTE'}
            </button>

            <button
              className={`icon-btn ${isDemo ? 'icon-btn--active' : ''}`}
              onClick={playDemo}
              aria-label={isDemo ? 'Stop demo' : 'Play demo'}
              id="btn-demo"
            >
              {isDemo ? '⏹' : '▶'} {isDemo ? 'STOP DEMO' : 'PLAY DEMO'}
            </button>
          </div>
        </div>
      </div>

      {/* Card Grid */}
      <div
        className={`card-grid card-grid--${difficulty}`}
        style={{
          gridTemplateColumns: `repeat(${config.cols}, 1fr)`,
        }}
        role="grid"
        aria-label={`${config.label} difficulty: ${config.rows}x${config.cols} grid`}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isFlipped={flippedCards.includes(card.id)}
            isMatched={matchedCards.includes(card.id)}
            onClick={flipCard}
            disabled={isPaused || isFinished || isDemo}
          />
        ))}
      </div>

      {/* Pause Overlay */}
      {isPaused && (
        <div className="pause-overlay" aria-live="polite">
          <div className="pause-overlay__content">
            <span className="pause-overlay__icon">⏸</span>
            <h2 className="pause-overlay__text">PAUSED</h2>
            <p className="pause-overlay__hint">
              Click RESUME in the sidebar to continue
            </p>
          </div>
        </div>
      )}

      {/* Bottom Restart */}
      <div className="game-board__footer">
        <button
          className="control-btn control-btn--primary control-btn--large"
          onClick={() => restartGame()}
          id="btn-restart-bottom"
        >
          ↻ RESTART GAME
        </button>
      </div>
    </main>
  );
};

export default GameBoard;
