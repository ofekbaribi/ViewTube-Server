const jwt = require('jsonwebtoken');
const UserService = require('../services/userService');

const secret = process.env.JWT_SECERT;

const generateToken = (user) => {
  return jwt.sign({ username: user.username }, secret, { expiresIn: '24h' });
};

const verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, secret);
    const user = await UserService.getUserByUsername(decoded.username);
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    throw new Error('Token verification failed');
  }
};

// Controller method to handle logging in a user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserService.authenticateUser(username, password);
    if (user) {
      const token = generateToken(user);
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateToken, verifyToken, loginUser };
