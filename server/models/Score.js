import mongoose from 'mongoose';

/**
 * Score Schema
 * Stores completed game scores for the leaderboard.
 * Indexed for efficient leaderboard queries.
 */
const scoreSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true,
    },
    moves: {
      type: Number,
      required: true,
      min: 1,
    },
    time: {
      type: Number, // Time in seconds
      required: true,
      min: 0,
    },
    pairs: {
      type: Number,
      required: true,
      min: 1,
    },
    rating: {
      type: Number, // 1, 2, or 3 stars
      required: true,
      min: 1,
      max: 3,
    },
    completed: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // Provides createdAt
  }
);

/**
 * Compound index for efficient leaderboard queries.
 * Sorts by: pairs DESC, moves ASC, time ASC
 */
scoreSchema.index({ difficulty: 1, pairs: -1, moves: 1, time: 1 });
scoreSchema.index({ user: 1, createdAt: -1 }); // User's recent scores

const Score = mongoose.model('Score', scoreSchema);
export default Score;
