import Game from '../models/Game.js';
import Score from '../models/Score.js';

// Map difficulty to expected total pairs
const DIFFICULTY_PAIRS = {
  easy: 8,
  medium: 10,
  hard: 18,
};

// Move limits per difficulty (for validation)
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
      user: req.user ? req.user._id : null,
      difficulty,
      totalPairs: DIFFICULTY_PAIRS[difficulty],
    });

    res.status(201).json({ success: true, game });
  } catch (error) {
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
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }

    res.json({ success: true, game });
  } catch (error) {
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
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }

    // Only allow updating active games
    if (game.status !== 'playing') {
      return res.status(400).json({
        success: false,
        message: 'Cannot update a completed game',
      });
    }

    const { moves, time, pairsFound, status } = req.body;

    if (moves !== undefined) game.moves = moves;
    if (time !== undefined) game.time = time;
    if (pairsFound !== undefined) game.pairsFound = pairsFound;
    if (status !== undefined) game.status = status;

    await game.save();

    res.json({ success: true, game });
  } catch (error) {
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
    const game = await Game.findById(req.params.id);

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

    // --- Server-side validation ---
    // Validate that moves is reasonable (at least as many as pairs found)
    if (!moves || moves < pairsFound) {
      return res.status(400).json({
        success: false,
        message: 'Invalid move count',
      });
    }

    // Validate pairs found doesn't exceed total
    if (pairsFound > game.totalPairs) {
      return res.status(400).json({
        success: false,
        message: 'Pairs found exceeds total pairs',
      });
    }

    // Validate time is positive
    if (time < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid time',
      });
    }

    // Validate rating
    if (!rating || rating < 1 || rating > 3) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 3',
      });
    }

    // Update game record
    game.moves = moves;
    game.time = time;
    game.pairsFound = pairsFound;
    game.status = pairsFound === game.totalPairs ? 'won' : 'game_over';
    game.completedAt = new Date();
    await game.save();

    // Save score if user is authenticated and game was won
    let score = null;
    if (req.user && game.status === 'won') {
      score = await Score.create({
        user: req.user._id,
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
    res.status(500).json({
      success: false,
      message: 'Failed to complete game',
    });
  }
};
