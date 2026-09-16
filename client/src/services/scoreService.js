import api from './api';

/**
 * Score & Leaderboard API service.
 * Handles score submission, personal scores, and leaderboard data.
 */
const scoreService = {
  /**
   * Submit a completed game score (requires auth).
   * @param {{ difficulty: string, moves: number, time: number, pairs: number, rating: number }} data
   */
  submitScore: async (data) => {
    const response = await api.post('/scores', data);
    return response.data;
  },

  /**
   * Get the current user's score history.
   * @returns {Promise<{ scores: Array }>}
   */
  getMyScores: async () => {
    const response = await api.get('/scores/me');
    return response.data;
  },

  /**
   * Get leaderboard scores.
   * @param {string} [difficulty] - Optional filter: 'easy', 'medium', 'hard'
   * @returns {Promise<{ scores: Array }>}
   */
  getLeaderboard: async (difficulty) => {
    const params = difficulty ? { difficulty } : {};
    const response = await api.get('/leaderboard', { params });
    return response.data;
  },

  /**
   * Create a new game session on the backend.
   * @param {{ difficulty: string }} data
   */
  createGame: async (data) => {
    const response = await api.post('/games', data);
    return response.data;
  },

  /**
   * Complete a game and save score.
   * @param {string} gameId - The game's MongoDB _id
   * @param {{ moves: number, time: number, pairsFound: number, rating: number }} data
   */
  completeGame: async (gameId, data) => {
    const response = await api.post(`/games/${gameId}/complete`, data);
    return response.data;
  },
};

export default scoreService;
