import { DataTypes } from 'sequelize';
import { getSequelize } from '../config/db.js';

const sequelize = getSequelize();

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Guests get null
    references: {
      model: 'users',
      key: 'id',
    },
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false,
    validate: {
      isIn: {
        args: [['easy', 'medium', 'hard']],
        msg: 'Difficulty is required (easy, medium, hard)',
      },
    },
  },
  moves: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: { min: 0 },
  },
  time: {
    type: DataTypes.INTEGER, // Time in seconds
    defaultValue: 0,
    validate: { min: 0 },
  },
  pairs_found: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: { min: 0 },
  },
  total_pairs: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('playing', 'won', 'game_over'),
    defaultValue: 'playing',
  },
  started_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});

export default Game;
