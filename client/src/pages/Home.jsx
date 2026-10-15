import { useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import GameBoard from '../components/GameBoard';
import WinModal from '../components/WinModal';
import useGame from '../hooks/useGame';
import { useAuth } from '../context/AuthContext';
import scoreService from '../services/scoreService';

/**
 * Home page — Main game view.
 * Composes Sidebar + GameBoard + WinModal.
 *
 * Score submission flow:
 * - If a gameId exists (backend game was created), uses completeGame endpoint
 *   which both updates the Game record and creates a Score in one request.
 * - Falls back to submitScore for edge cases (e.g., backend was unreachable
 *   during game creation but user is now authenticated).
 */
const Home = () => {
  const game = useGame();
  const { isAuthenticated } = useAuth();
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [submittingScore, setSubmittingScore] = useState(false);

  /**
   * Submit the completed game score to the backend.
   *
   * Uses the completeGame endpoint if a gameId is available (preferred path),
   * otherwise falls back to direct score submission.
   */
  const handleSubmitScore = useCallback(async () => {
    if (submittingScore || scoreSubmitted) return;

    setSubmittingScore(true);
    try {
      if (game.gameId) {
        // Preferred: complete the game record and create score atomically
        await scoreService.completeGame(game.gameId, {
          moves: game.moves,
          time: game.time,
          pairsFound: game.pairsFound,
          rating: game.rating,
        });
      } else {
        // Fallback: submit score directly (no game record in DB)
        await scoreService.submitScore({
          difficulty: game.difficulty,
          moves: game.moves,
          time: game.time,
          pairs: game.pairsFound,
          rating: game.rating,
        });
      }
      setScoreSubmitted(true);
    } catch (err) {
      console.error('Failed to submit score:', err);
      // If completeGame fails because game is already completed (from auto-complete in useGame),
      // try submitting score directly as fallback
      if (game.gameId && err.response?.status === 400) {
        try {
          await scoreService.submitScore({
            difficulty: game.difficulty,
            moves: game.moves,
            time: game.time,
            pairs: game.pairsFound,
            rating: game.rating,
          });
          setScoreSubmitted(true);
          return;
        } catch (fallbackErr) {
          console.error('Fallback score submission also failed:', fallbackErr);
        }
      }
      alert('Failed to save score. Please try again.');
    } finally {
      setSubmittingScore(false);
    }
  }, [game, submittingScore, scoreSubmitted]);

  /**
   * Restart game and reset score submission state.
   */
  const handleRestart = useCallback(() => {
    game.restartGame();
    setScoreSubmitted(false);
    setSubmittingScore(false);
  }, [game]);

  return (
    <div className="game-layout">
      <Sidebar game={game} />
      <GameBoard game={game} />
      <WinModal
        gameStatus={game.gameStatus}
        moves={game.moves}
        time={game.time}
        formatTime={game.formatTime}
        pairsFound={game.pairsFound}
        totalPairs={game.totalPairs}
        rating={game.rating}
        onRestart={handleRestart}
        onSubmitScore={handleSubmitScore}
        scoreSubmitted={scoreSubmitted}
        submittingScore={submittingScore}
      />
    </div>
  );
};

export default Home;
