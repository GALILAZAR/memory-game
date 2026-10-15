import { Sequelize } from 'sequelize';

let sequelize;

/**
 * Get or create the Sequelize instance.
 * Must be called after dotenv.config() has loaded environment variables.
 */
const getSequelize = () => {
  if (!sequelize) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      logging: false,
      define: {
        underscored: true, // Use snake_case for DB columns (e.g. created_at)
        timestamps: true,  // Auto-manage createdAt / updatedAt
      },
    });
  }
  return sequelize;
};

/**
 * Connect to PostgreSQL and sync all models.
 * Creates tables if they don't exist (alter: true applies non-destructive changes).
 */
const connectDB = async () => {
  try {
    const db = getSequelize();
    await db.authenticate();
    console.log(`PostgreSQL Connected: ${db.config.host}:${db.config.port}`);

    // Import the associations file — this registers all models + their relations
    await import('../models/index.js');

    // Sync all models (alter: true adjusts columns without dropping data)
    await db.sync({ alter: true });
    console.log('All models synchronized');
  } catch (error) {
    console.error(`PostgreSQL Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export { getSequelize };
export default connectDB;
