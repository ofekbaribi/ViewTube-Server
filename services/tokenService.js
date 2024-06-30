const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECERT;

const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const user = jwt.verify(token, secret);
    req.username = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticateJWT };
