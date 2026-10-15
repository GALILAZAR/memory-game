import Score from '../models/Score.js';
import User from '../models/User.js';

/**
 * @desc    Get leaderboard scores
 * @route   GET /api/leaderboard
 * @access  Public
 * @query   difficulty (optional) — filter by easy, medium, hard
 *
 * Ranking priority:
 *  1. More pairs completed (desc)
 *  2. Fewer moves (asc)
 *  3. Less time (asc)
 */
export const getLeaderboard = async (req, res) => {
  try {
    const { difficulty } = req.query;

    // Build query filter
    const where = { completed: true };
    if (difficulty && ['easy', 'medium', 'hard'].includes(difficulty)) {
      where.difficulty = difficulty;
    }

    const scores = await Score.findAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
      order: [
        ['pairs', 'DESC'],
        ['moves', 'ASC'],
        ['time', 'ASC'],
      ],
      limit: 50,
    });

    res.json({
      success: true,
      scores: scores.map((score, index) => ({
        rank: index + 1,
        player: score.user?.name || 'Unknown',
        difficulty: score.difficulty,
        moves: score.moves,
        time: score.time,
        pairs: score.pairs,
        rating: score.rating,
        date: score.createdAt,
      })),
    });
  } catch (error) {
    console.error('getLeaderboard error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard',
    });
  }
};

/**
 * @desc    Submit a score
 * @route   POST /api/scores
 * @access  Private
 */
export const submitScore = async (req, res) => {
  try {
    const { difficulty, moves, time, pairs, rating } = req.body;

    // Validate required fields
    if (!difficulty || !moves || time === undefined || !pairs || !rating) {
      return res.status(400).json({
        success: false,
        message: 'All score fields are required',
      });
    }

    // Validate difficulty
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid difficulty',
      });
    }

    // Validate rating range
    if (rating < 1 || rating > 3) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 3',
      });
    }

    // Validate moves >= pairs (impossible to have fewer moves than pairs found)
    if (moves < pairs) {
      return res.status(400).json({
        success: false,
        message: 'Invalid score: moves cannot be less than pairs',
      });
    }

    const score = await Score.create({
      user_id: req.user.id,
      difficulty,
      moves,
      time,
      pairs,
      rating,
      completed: true,
    });

    res.status(201).json({ success: true, score });
  } catch (error) {
    console.error('submitScore error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit score',
    });
  }
};

/**
 * @desc    Get current user's scores (including best score)
 * @route   GET /api/scores/me
 * @access  Private
 */
export const getMyScores = async (req, res) => {
  try {
    const scores = await Score.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
      limit: 20,
    });

    // Calculate best (highest) score per difficulty
    // "Best" = most pairs, fewest moves, least time
    const bestScores = await Score.findAll({
      where: { user_id: req.user.id, completed: true },
      order: [
        ['pairs', 'DESC'],
        ['moves', 'ASC'],
        ['time', 'ASC'],
      ],
      attributes: ['difficulty', 'moves', 'time', 'pairs', 'rating', 'created_at'],
    });

    // Group best by difficulty — first entry per difficulty is the best
    const bestByDifficulty = {};
    for (const s of bestScores) {
      if (!bestByDifficulty[s.difficulty]) {
        bestByDifficulty[s.difficulty] = {
          difficulty: s.difficulty,
          moves: s.moves,
          time: s.time,
          pairs: s.pairs,
          rating: s.rating,
          date: s.createdAt,
        };
      }
    }

    res.json({
      success: true,
      scores: scores.map((score) => ({
        id: score.id,
        difficulty: score.difficulty,
        moves: score.moves,
        time: score.time,
        pairs: score.pairs,
        rating: score.rating,
        date: score.createdAt,
      })),
      bestScores: bestByDifficulty,
    });
  } catch (error) {
    console.error('getMyScores error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch scores',
    });
  }
};
