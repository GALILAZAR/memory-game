import mongoose from 'mongoose';

/**
 * Game Schema
 * Tracks individual game sessions.
 * Links to a user (optional for guest play).
 */
const gameSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // null = guest game
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: [true, 'Difficulty is required'],
    },
    moves: {
      type: Number,
      default: 0,
      min: 0,
    },
    time: {
      type: Number, // Time in seconds
      default: 0,
      min: 0,
    },
    pairsFound: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalPairs: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['playing', 'won', 'game_over'],
      default: 'playing',
    },
    startedAt: {
      type: Date,
      default: Date.now,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model('Game', gameSchema);
export default Game;
