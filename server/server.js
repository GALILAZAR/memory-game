import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import leaderboardRoutes from './routes/leaderboardRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ---- Middleware ----

// Parse JSON request bodies
app.use(express.json());

// Enable CORS for the frontend dev server
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  })
);

// ---- Routes ----

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes: register, login, profile
app.use('/api/auth', authRoutes);

// Game routes: CRUD for game sessions
app.use('/api/games', gameRoutes);

// Leaderboard + Score routes
app.use('/api/leaderboard', leaderboardRoutes);

// Score routes (alternate mount point for clarity)
app.use('/api', leaderboardRoutes);

// ---- Error Handling ----
app.use(notFound);
app.use(errorHandler);

// ---- Start Server ----
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n⚡ Vault-Tec Server running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Auth:   http://localhost:${PORT}/api/auth`);
  console.log(`   Games:  http://localhost:${PORT}/api/games`);
  console.log(`   Board:  http://localhost:${PORT}/api/leaderboard\n`);
});
