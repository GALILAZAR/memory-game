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
 */
const Home = () => {
  const game = useGame();
  const { isAuthenticated } = useAuth();
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [submittingScore, setSubmittingScore] = useState(false);

  /**
   * Submit the completed game score to the backend.
   */
  const handleSubmitScore = useCallback(async () => {
    if (submittingScore || scoreSubmitted) return;

    setSubmittingScore(true);
    try {
      await scoreService.submitScore({
        difficulty: game.difficulty,
        moves: game.moves,
        time: game.time,
        pairs: game.pairsFound,
        rating: game.rating,
      });
      setScoreSubmitted(true);
    } catch (err) {
      console.error('Failed to submit score:', err);
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
