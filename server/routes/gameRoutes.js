import express from 'express';
import {
  createGame,
  getGame,
  updateGame,
  completeGame,
} from '../controllers/gameController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/games — Start a new game (guests allowed)
router.post('/', optionalAuth, createGame);

// GET /api/games/:id — Get game details
router.get('/:id', optionalAuth, getGame);

// PATCH /api/games/:id — Update game progress
router.patch('/:id', optionalAuth, updateGame);

// POST /api/games/:id/complete — Complete game and optionally save score
router.post('/:id/complete', optionalAuth, completeGame);

export default router;
