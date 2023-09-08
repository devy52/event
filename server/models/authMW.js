// authMiddleware.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'your-secret-key-here', { expiresIn: '1h' });
};

module.exports = { comparePasswords, generateToken };
