import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token for a user.
 * @param {string} id - The user's MongoDB _id
 * @returns {string} Signed JWT token (expires in 30 days)
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

export default generateToken;
