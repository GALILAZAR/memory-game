import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token for a user.
 * @param {number} id - The user's PostgreSQL id
 * @returns {string} Signed JWT token (expires in 30 days)
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
