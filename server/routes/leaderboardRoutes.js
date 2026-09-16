import express from 'express';
import {
  getLeaderboard,
  submitScore,
  getMyScores,
} from '../controllers/leaderboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/leaderboard — Public leaderboard (optional ?difficulty= filter)
router.get('/', getLeaderboard);

// POST /api/scores — Submit a score (requires auth)
router.post('/scores', protect, submitScore);

// GET /api/scores/me — Get my scores (requires auth)
router.get('/scores/me', protect, getMyScores);

export default router;
