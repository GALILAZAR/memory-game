import Stats from './Stats';
import GameControls from './GameControls';
import Leaderboard from './Leaderboard';

/**
 * Sidebar component — Left panel with all game info and controls.
 *
 * Contains:
 * - Game title and description
 * - Stats (moves, timer, rating, pairs)
 * - Game controls (restart, reveal, pause, move limit)
 * - Tip box
 * - Leaderboard
 */
const Sidebar = ({ game }) => {
  const {
    moves,
    time,
    formatTime,
    rating,
    pairsFound,
    totalPairs,
    gameStatus,
    revealsLeft,
    showMoveLimit,
    moveLimit,
    difficulty,
    restartGame,
    revealPair,
    pauseGame,
    resumeGame,
    toggleMoveLimit,
  } = game;

  return (
    <aside className="sidebar" role="complementary" aria-label="Game information">
      {/* Title Section */}
      <div className="sidebar__header">
        <h1 className="sidebar__title">
          <span className="sidebar__title-vault">VAULT-TEC</span>
          <span className="sidebar__title-memory">MEMORY</span>
        </h1>
        <p className="sidebar__desc">
          Pip-Boy Training — Find all Tech Pairs
        </p>
      </div>

      {/* Stats */}
      <Stats
        moves={moves}
        time={time}
        formatTime={formatTime}
        rating={rating}
        pairsFound={pairsFound}
        totalPairs={totalPairs}
      />

      {/* Controls */}
      <GameControls
        gameStatus={gameStatus}
        revealsLeft={revealsLeft}
        showMoveLimit={showMoveLimit}
        moveLimit={moveLimit}
        onRestart={() => restartGame()}
        onRevealPair={revealPair}
        onPause={pauseGame}
        onResume={resumeGame}
        onToggleMoveLimit={toggleMoveLimit}
      />

      {/* Tip Box */}
      <div className="sidebar__tip" role="note">
        <span className="sidebar__tip-icon">💡</span>
        <p className="sidebar__tip-text">
          Try to remember positions — the Pip-Boy rewards patience.
        </p>
      </div>

      {/* Leaderboard */}
      <Leaderboard difficulty={difficulty} />
    </aside>
  );
};

export default Sidebar;
