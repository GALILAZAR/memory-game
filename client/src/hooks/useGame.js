import { useState, useCallback, useRef, useEffect } from 'react';
import { CARD_TYPES, DIFFICULTIES, GAME_STATUS } from '../data/cards';
import useTimer from './useTimer';

/**
 * Fisher-Yates shuffle algorithm.
 * Creates a new shuffled array (doesn't mutate the original).
 * @param {Array} array - Array to shuffle
 * @returns {Array} New shuffled array
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Generate a deck of cards for the given difficulty.
 * Selects N random card types, duplicates each to create pairs,
 * assigns unique IDs, and shuffles.
 *
 * @param {string} difficulty - 'easy', 'medium', or 'hard'
 * @returns {Array} Shuffled deck of card objects
 */
const generateDeck = (difficulty) => {
  const { pairs } = DIFFICULTIES[difficulty];

  // Randomly select the required number of card types
  const shuffledTypes = shuffleArray(CARD_TYPES);
  const selectedTypes = shuffledTypes.slice(0, pairs);

  // Create pairs (two of each selected type)
  const deck = [];
  selectedTypes.forEach((cardType) => {
    deck.push({
      id: `${cardType.type}-a`, // Unique ID for card A
      type: cardType.type,
      name: cardType.name,
      icon: cardType.icon,
    });
    deck.push({
      id: `${cardType.type}-b`, // Unique ID for card B
      type: cardType.type,
      name: cardType.name,
      icon: cardType.icon,
    });
  });

  return shuffleArray(deck);
};

/**
 * Calculate star rating based on performance.
 *
 * Rating formula considers:
 * - Number of moves vs optimal (pairs count)
 * - Time taken
 * - Difficulty multiplier
 *
 * @param {number} moves - Total moves made
 * @param {number} time - Total time in seconds
 * @param {string} difficulty - 'easy', 'medium', 'hard'
 * @returns {number} Rating: 1, 2, or 3 stars
 */
const calculateRating = (moves, time, difficulty) => {
  const { pairs } = DIFFICULTIES[difficulty];

  // Optimal moves = number of pairs (perfect memory)
  // Good moves = pairs * 1.8
  // Okay moves = pairs * 2.5
  const moveRatio = moves / pairs;

  // Time thresholds scale with difficulty
  const timePerPair = time / pairs;

  if (moveRatio <= 1.6 && timePerPair <= 5) return 3; // Excellent
  if (moveRatio <= 2.2 && timePerPair <= 8) return 2; // Good
  return 1; // Keep trying
};

/**
 * Web Audio API sound effects.
 * Generates sounds programmatically — no audio files needed.
 */
const createAudioContext = () => {
  try {
    return new (window.AudioContext || window.webkitAudioContext)();
  } catch {
    return null;
  }
};

const playSound = (audioCtx, type) => {
  if (!audioCtx) return;

  try {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    switch (type) {
      case 'flip':
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.1);
        break;

      case 'match':
        oscillator.frequency.setValueAtTime(523, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(659, audioCtx.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(784, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.4);
        break;

      case 'mismatch':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.3);
        break;

      case 'win':
        oscillator.frequency.setValueAtTime(523, audioCtx.currentTime);
        oscillator.frequency.setValueAtTime(659, audioCtx.currentTime + 0.15);
        oscillator.frequency.setValueAtTime(784, audioCtx.currentTime + 0.3);
        oscillator.frequency.setValueAtTime(1047, audioCtx.currentTime + 0.45);
        gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.7);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.7);
        break;

      case 'gameover':
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.6);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.6);
        break;

      case 'click':
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.05);
        break;

      default:
        break;
    }
  } catch {
    // Silently fail if audio context is in a bad state
  }
};

/**
 * useGame — Core game logic hook.
 *
 * Manages the entire game state: deck, flipping, matching,
 * scoring, difficulty, pause/resume, reveal, demo mode.
 */
const useGame = () => {
  // ---- Game State ----
  const [difficulty, setDifficulty] = useState('easy');
  const [cards, setCards] = useState(() => generateDeck('easy'));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.READY);
  const [isMuted, setIsMuted] = useState(false);
  const [showMoveLimit, setShowMoveLimit] = useState(false);
  const [rating, setRating] = useState(3);
  const [revealsLeft, setRevealsLeft] = useState(3);
  const [isDemo, setIsDemo] = useState(false);
  const [gameId, setGameId] = useState(null);

  // Timer hook
  const timer = useTimer();

  // Refs for preventing race conditions during card comparison
  const isCheckingRef = useRef(false);
  const audioCtxRef = useRef(null);
  const demoTimeoutRef = useRef(null);

  // Initialize audio context lazily (requires user interaction)
  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = createAudioContext();
    }
    return audioCtxRef.current;
  }, []);

  /**
   * Play a sound effect (respects mute state).
   */
  const sound = useCallback(
    (type) => {
      if (!isMuted) {
        playSound(getAudioCtx(), type);
      }
    },
    [isMuted, getAudioCtx]
  );

  // Derived state
  const totalPairs = DIFFICULTIES[difficulty].pairs;
  const pairsFound = matchedCards.length / 2;
  const moveLimit = DIFFICULTIES[difficulty].moveLimit;
  const isGameActive =
    gameStatus === GAME_STATUS.PLAYING ||
    gameStatus === GAME_STATUS.READY;

  /**
   * Start a new game with the current difficulty.
   */
  const restartGame = useCallback(
    (newDifficulty) => {
      const diff = newDifficulty || difficulty;

      // Cancel any demo mode
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
        demoTimeoutRef.current = null;
      }
      setIsDemo(false);

      // Reset all state
      setCards(generateDeck(diff));
      setFlippedCards([]);
      setMatchedCards([]);
      setMoves(0);
      setGameStatus(GAME_STATUS.READY);
      setRating(3);
      setRevealsLeft(3);
      setGameId(null);
      isCheckingRef.current = false;
      timer.reset();

      if (newDifficulty) {
        setDifficulty(diff);
      }
    },
    [difficulty, timer]
  );

  /**
   * Change difficulty — restarts the game with new settings.
   */
  const changeDifficulty = useCallback(
    (newDifficulty) => {
      restartGame(newDifficulty);
    },
    [restartGame]
  );

  /**
   * Flip a card.
   * Handles all click prevention, matching logic, and game state transitions.
   */
  const flipCard = useCallback(
    (cardId) => {
      // Prevent clicks during: checking, pause, demo, game over/won
      if (
        isCheckingRef.current ||
        gameStatus === GAME_STATUS.PAUSED ||
        gameStatus === GAME_STATUS.WON ||
        gameStatus === GAME_STATUS.GAME_OVER ||
        isDemo
      ) {
        return;
      }

      // Prevent clicking already flipped or matched cards
      if (flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
        return;
      }

      // Prevent flipping more than 2 cards
      if (flippedCards.length >= 2) {
        return;
      }

      // Start the game on first card click
      if (gameStatus === GAME_STATUS.READY) {
        setGameStatus(GAME_STATUS.PLAYING);
        timer.start();
      }

      sound('flip');

      const newFlipped = [...flippedCards, cardId];
      setFlippedCards(newFlipped);

      // If this is the second card, check for a match
      if (newFlipped.length === 2) {
        isCheckingRef.current = true;
        setMoves((prev) => prev + 1);

        const [firstId, secondId] = newFlipped;
        const firstCard = cards.find((c) => c.id === firstId);
        const secondCard = cards.find((c) => c.id === secondId);

        if (firstCard.type === secondCard.type) {
          // ---- MATCH ----
          sound('match');
          const newMatched = [...matchedCards, firstId, secondId];
          setMatchedCards(newMatched);
          setFlippedCards([]);
          isCheckingRef.current = false;

          // Check for win
          if (newMatched.length === cards.length) {
            const currentMoves = moves + 1;
            const finalRating = calculateRating(
              currentMoves,
              timer.time,
              difficulty
            );
            setRating(finalRating);
            setGameStatus(GAME_STATUS.WON);
            timer.stop();
            sound('win');
          }
        } else {
          // ---- NO MATCH ----
          sound('mismatch');
          setTimeout(() => {
            setFlippedCards([]);
            isCheckingRef.current = false;
          }, 1000);
        }
      }
    },
    [
      cards,
      flippedCards,
      matchedCards,
      moves,
      gameStatus,
      difficulty,
      isDemo,
      timer,
      sound,
    ]
  );

  /**
   * Check move limit after each move.
   */
  useEffect(() => {
    if (
      showMoveLimit &&
      moves >= moveLimit &&
      gameStatus === GAME_STATUS.PLAYING
    ) {
      setGameStatus(GAME_STATUS.GAME_OVER);
      timer.stop();
      sound('gameover');
    }
  }, [moves, showMoveLimit, moveLimit, gameStatus, timer, sound]);

  /**
   * Update rating in real-time as moves increase.
   */
  useEffect(() => {
    if (gameStatus === GAME_STATUS.PLAYING) {
      setRating(calculateRating(moves, timer.time, difficulty));
    }
  }, [moves, timer.time, difficulty, gameStatus]);

  /**
   * Pause the game.
   */
  const pauseGame = useCallback(() => {
    if (gameStatus === GAME_STATUS.PLAYING) {
      setGameStatus(GAME_STATUS.PAUSED);
      timer.pause();
      sound('click');
    }
  }, [gameStatus, timer, sound]);

  /**
   * Resume the game.
   */
  const resumeGame = useCallback(() => {
    if (gameStatus === GAME_STATUS.PAUSED) {
      setGameStatus(GAME_STATUS.PLAYING);
      timer.resume();
      sound('click');
    }
  }, [gameStatus, timer, sound]);

  /**
   * Reveal one unmatched pair temporarily.
   * Limited to 3 reveals per game.
   */
  const revealPair = useCallback(() => {
    if (revealsLeft <= 0 || !isGameActive || isDemo) return;

    sound('click');

    // Find an unmatched card type
    const unmatchedCards = cards.filter(
      (card) => !matchedCards.includes(card.id)
    );

    if (unmatchedCards.length < 2) return;

    // Find the first type that has two unmatched cards
    const typeCount = {};
    for (const card of unmatchedCards) {
      if (!typeCount[card.type]) {
        typeCount[card.type] = [];
      }
      typeCount[card.type].push(card.id);
    }

    const pairType = Object.keys(typeCount).find(
      (type) => typeCount[type].length === 2
    );

    if (!pairType) return;

    const pairIds = typeCount[pairType];

    // Temporarily show the pair
    setFlippedCards(pairIds);
    setRevealsLeft((prev) => prev - 1);

    // Hide them after 1.5 seconds
    setTimeout(() => {
      setFlippedCards([]);
    }, 1500);
  }, [cards, matchedCards, revealsLeft, isGameActive, isDemo, sound]);

  /**
   * Toggle mute state.
   */
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  /**
   * Toggle move limit feature.
   */
  const toggleMoveLimit = useCallback(() => {
    setShowMoveLimit((prev) => !prev);
  }, []);

  /**
   * Play demo — automatically demonstrates gameplay.
   * Reveals cards in sequence to show how the game works.
   */
  const playDemo = useCallback(() => {
    if (isDemo) {
      // Exit demo mode
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
        demoTimeoutRef.current = null;
      }
      setIsDemo(false);
      restartGame();
      return;
    }

    setIsDemo(true);
    sound('click');

    // Create a fresh demo deck
    const demoDeck = generateDeck(difficulty);
    setCards(demoDeck);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setGameStatus(GAME_STATUS.PLAYING);
    timer.reset();

    // Find pairs in the deck for the demo sequence
    const typeMap = {};
    demoDeck.forEach((card) => {
      if (!typeMap[card.type]) typeMap[card.type] = [];
      typeMap[card.type].push(card.id);
    });

    const pairs = Object.values(typeMap).slice(0, 3); // Demo 3 pairs
    let delay = 500;
    let currentMatched = [];

    pairs.forEach((pair, index) => {
      // Flip first card
      demoTimeoutRef.current = setTimeout(() => {
        setFlippedCards([pair[0]]);
      }, delay);
      delay += 800;

      // Flip second card
      demoTimeoutRef.current = setTimeout(() => {
        setFlippedCards([pair[0], pair[1]]);
      }, delay);
      delay += 800;

      // Match them
      demoTimeoutRef.current = setTimeout(() => {
        currentMatched = [...currentMatched, pair[0], pair[1]];
        setMatchedCards([...currentMatched]);
        setFlippedCards([]);
        setMoves(index + 1);
      }, delay);
      delay += 600;
    });

    // End demo
    demoTimeoutRef.current = setTimeout(() => {
      setIsDemo(false);
      restartGame();
    }, delay + 1000);
  }, [isDemo, difficulty, timer, restartGame, sound]);

  // Cleanup demo timeouts on unmount
  useEffect(() => {
    return () => {
      if (demoTimeoutRef.current) {
        clearTimeout(demoTimeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    cards,
    flippedCards,
    matchedCards,
    moves,
    difficulty,
    gameStatus,
    isMuted,
    showMoveLimit,
    rating,
    revealsLeft,
    isDemo,
    gameId,
    totalPairs,
    pairsFound,
    moveLimit,

    // Timer
    time: timer.time,
    formatTime: timer.formatTime,

    // Actions
    flipCard,
    restartGame,
    changeDifficulty,
    pauseGame,
    resumeGame,
    revealPair,
    toggleMute,
    toggleMoveLimit,
    playDemo,
    setGameId,
    sound,
  };
};

export default useGame;
