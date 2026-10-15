import { DataTypes } from 'sequelize';
import { getSequelize } from '../config/db.js';

const sequelize = getSequelize();

const Score = sequelize.define('Score', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false,
  },
  moves: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  time: {
    type: DataTypes.INTEGER, // Time in seconds
    allowNull: false,
    validate: { min: 0 },
  },
  pairs: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1 },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 3 },
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  indexes: [
    // Compound index for efficient leaderboard queries
    // Sorts by: pairs DESC, moves ASC, time ASC
    {
      fields: ['difficulty', 'pairs', 'moves', 'time'],
      name: 'idx_leaderboard',
    },
    // User's recent scores
    {
      fields: ['user_id', 'created_at'],
      name: 'idx_user_recent_scores',
    },
  ],
});

export default Score;
