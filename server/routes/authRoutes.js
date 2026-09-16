import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  registerValidation,
  loginValidation,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/register — Create a new user account
router.post('/register', registerValidation, registerUser);

// POST /api/auth/login — Authenticate and get JWT token
router.post('/login', loginValidation, loginUser);

// GET /api/auth/me — Get current user's profile (requires auth)
router.get('/me', protect, getMe);

export default router;
