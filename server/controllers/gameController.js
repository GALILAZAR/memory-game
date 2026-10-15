import Game from '../models/Game.js';
import Score from '../models/Score.js';

const DIFFICULTY_PAIRS = {
  easy: 8,
  medium: 10,
  hard: 18,
};

const MOVE_LIMITS = {
  easy: 30,
  medium: 40,
  hard: 70,
};

/**
 * @desc    Create a new game session
 * @route   POST /api/games
 * @access  Private (optional auth — guests get null user)
 */
export const createGame = async (req, res) => {
  try {
    const { difficulty } = req.body;

    if (!difficulty || !DIFFICULTY_PAIRS[difficulty]) {
      return res.status(400).json({
        success: false,
        message: 'Valid difficulty (easy, medium, hard) is required',
      });
    }

    const game = await Game.create({
      user_id: req.user ? req.user.id : null,
      difficulty,
      total_pairs: DIFFICULTY_PAIRS[difficulty],
    });

    res.status(201).json({ success: true, game });
  } catch (error) {
    console.error('createGame error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create game',
    });
  }
};

/**
 * @desc    Get a game by ID
 * @route   GET /api/games/:id
 * @access  Private
 */
export const getGame = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }

    res.json({ success: true, game });
  } catch (error) {
    console.error('getGame error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch game',
    });
  }
};

/**
 * @desc    Update a game (moves, pairs, status)
 * @route   PATCH /api/games/:id
 * @access  Private
 */
export const updateGame = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }

    if (game.status !== 'playing') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update a completed game',
      });
    }

    const { moves, time, pairsFound, status } = req.body;

    if (moves !== undefined) game.moves = moves;
    if (time !== undefined) game.time = time;
    if (pairsFound !== undefined) game.pairs_found = pairsFound;
    if (status !== undefined) game.status = status;

    await game.save();

    res.json({ success: true, game });
  } catch (error) {
    console.error('updateGame error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update game',
    });
  }
};

/**
 * @desc    Complete a game and save score
 * @route   POST /api/games/:id/complete
 * @access  Private
 */
export const completeGame = async (req, res) => {
  try {
    const game = await Game.findByPk(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }

    if (game.status !== 'playing') {
      return res.status(400).json({
        success: false,
        message: 'Game is already completed',
      });
    }

    const { moves, time, pairsFound, rating } = req.body;

    // Validate moves — must be a number >= 0 and at least as many as pairsFound
    if (moves == null || typeof moves !== 'number' || moves < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid move count',
      });
    }

    if (pairsFound == null || typeof pairsFound !== 'number' || pairsFound < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid pairs found count',
      });
    }

    if (moves < pairsFound) {
      return res.status(400).json({
        success: false,
        message: 'Move count cannot be less than pairs found',
      });
    }

    if (pairsFound > game.total_pairs) {
      return res.status(400).json({
        success: false,
        message: 'Pairs found exceeds total pairs',
      });
    }

    if (time == null || typeof time !== 'number' || time < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time',
      });
    }

    if (rating == null || typeof rating !== 'number' || rating < 1 || rating > 3) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 3',
      });
    }

    game.moves = moves;
    game.time = time;
    game.pairs_found = pairsFound;
    game.status = pairsFound === game.total_pairs ? 'won' : 'game_over';
    game.completed_at = new Date();
    await game.save();

    // Save score if user is logged in and game is won
    let score = null;
    if (req.user && game.status === 'won') {
      score = await Score.create({
        user_id: req.user.id,
        difficulty: game.difficulty,
        moves,
        time,
        pairs: pairsFound,
        rating,
        completed: true,
      });
    }

    res.json({
      success: true,
      game,
      score,
    });
  } catch (error) {
    console.error('completeGame error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to complete game',
    });
  }
};
