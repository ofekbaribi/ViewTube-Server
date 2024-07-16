const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token operations

const secret = process.env.JWT_SECRET; // Secret key for JWT, should match the key in your .env file

/**
 * Middleware function to authenticate JWT.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Next function to call in middleware chain.
 * @returns {void}
 */
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header from the request

  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' }); // Return 401 if no Authorization header is present
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the Authorization header
  console.log('Token:', token); // Log the token for debugging purposes

  try {
    const user = jwt.verify(token, secret); // Verify the token using the secret key
    req.user = user; // Attach the decoded user object to the request object
    next(); // Call the next middleware or route handler
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' }); // Return 401 if token verification fails
  }
};

module.exports = { authenticateJWT }; // Export the authenticateJWT middleware function
