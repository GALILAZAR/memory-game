import api from './api';

/**
 * Score & Game API service.
 * Handles game lifecycle, score submission, personal scores, and leaderboard data.
 */
const scoreService = {
  /**
   * Create a new game session on the backend.
   * @param {{ difficulty: string }} data
   * @returns {Promise<{ success: boolean, game: object }>}
   */
  createGame: async (data) => {
    const response = await api.post('/games', data);
    return response.data;
  },

  /**
   * Update game progress (moves, time, pairs found, status).
   * @param {number|string} gameId - The game's primary key
   * @param {{ moves?: number, time?: number, pairsFound?: number, status?: string }} data
   * @returns {Promise<{ success: boolean, game: object }>}
   */
  updateGame: async (gameId, data) => {
    const response = await api.patch(`/games/${gameId}`, data);
    return response.data;
  },

  /**
   * Complete a game and save score.
   * @param {number|string} gameId - The game's primary key
   * @param {{ moves: number, time: number, pairsFound: number, rating: number }} data
   * @returns {Promise<{ success: boolean, game: object, score: object|null }>}
   */
  completeGame: async (gameId, data) => {
    const response = await api.post(`/games/${gameId}/complete`, data);
    return response.data;
  },

  /**
   * Submit a completed game score directly (requires auth).
   * Used as a fallback when no gameId is available (guest games).
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
};

export default scoreService;
