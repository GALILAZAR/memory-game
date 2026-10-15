/**
 * Define all Sequelize model associations in one place.
 * This file is imported by db.js after all models are loaded.
 */
import User from './User.js';
import Game from './Game.js';
import Score from './Score.js';

// ---- User <-> Game ----
User.hasMany(Game, { foreignKey: 'user_id', as: 'games' });
Game.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// ---- User <-> Score ----
User.hasMany(Score, { foreignKey: 'user_id', as: 'scores' });
Score.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export { User, Game, Score };
