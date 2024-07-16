const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET; // Ensure this matches your .env file

// Function to generate a JWT token for a user
const generateToken = (user) => {
  if (!secret) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.sign({ 
    username: user.username, 
    firstName: user.firstName, 
    lastName: user.lastName, 
    image: user.image 
  }, secret, { expiresIn: '24h' }); // Token expires in 24 hours
};

// Function to verify a JWT token
const verifyToken = (token) => {
  if (!secret) {
    throw new Error('JWT secret is not defined');
  }
  return jwt.verify(token, secret);
};

// Controller method to handle logging in a user
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body; // Extract username and password from request body
    const userService = require('../services/userService'); // Import the user service
    const user = await userService.authenticateUser(username, password); // Authenticate the user
    if (user) {
      const token = generateToken(user); // Generate a token if authentication is successful
      res.status(200).json({ user, token }); // Send the user data and token as response
    } else {
      res.status(401).json({ error: 'Invalid username or password' }); // Send error if authentication fails
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response in case of failure
  }
};

// Controller method to handle token verification
const verifyUserToken = (req, res) => {
  const token = req.body.token; // Extract token from request body
  
  if (typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid token format' }); // Send error if token format is invalid
  }

  try {
    const userData = verifyToken(token); // Verify the token
    res.json(userData); // Send the decoded user data as response
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' }); // Send error if token is invalid
  }
};

// Export the functions to be used in routes
module.exports = { generateToken, verifyUserToken, loginUser };
