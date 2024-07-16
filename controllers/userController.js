const UserService = require('../services/userService');
const { generateToken } = require('../controllers/tokenController');

// Controller method to handle creating a new user
const createUser = async (req, res) => {
  try {
    const userData = req.body; // Extract user data from request body
    const { user, token } = await UserService.createUser(userData); // Destructure user and token from service response
    res.status(201).json({ user, token }); // Send user and token in response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response in case of failure
  }
};

// Controller method to handle getting a user by username
const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username; // Extract username from request parameters
    const user = await UserService.getUserByUsername(username); // Get user by username
    res.status(200).json(user); // Send user data in response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response in case of failure
  }
};

// Controller method to handle updating a user by username
const updateUser = async (req, res) => {
  try {
    const username = req.params.username; // Extract username from request parameters
    const { firstName, lastName, image } = req.body; // Extract new user data from request body
    const user = await UserService.updateUser(username, firstName, lastName); // Update user data
    if (image) {
      const updatedImageUser = await UserService.updateProfilePicture(username, image); // Update profile picture if provided
      user.image = updatedImageUser.image; // Update user image
    }
    res.status(200).json(user); // Send updated user data in response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response in case of failure
  }
};

// Controller method to handle updating a user's password
const updatePassword = async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body; // Extract data from request body
    const verifyUser = await UserService.authenticateUser(username, currentPassword); // Verify current password
    if (!verifyUser) { 
      res.status(401).json({ error: 'Invalid password' }); // Send error if password is invalid
      return;
    }
    const user = await UserService.updatePassword(username, newPassword); // Update password
    const token = generateToken(user); // Generate new token
    user.password = null; // Remove password from user object before sending response
    res.status(200).json({ user, token }); // Send updated user data and token in response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response in case of failure
  }
};

// Controller method to handle deleting a user by username
const deleteUser = async (req, res) => {
  try {
    const { username } = req.params; // Extract username from request parameters
    const { password } = req.body; // Extract password from request body

    const user = await UserService.authenticateUser(username, password); // Verify password
    if (!user) {
      return res.status(401).json({ error: 'Invalid password' }); // Send error if password is invalid
    }

    // Delete user logic
    const deletedUser = await UserService.deleteUser(username); // Delete user
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' }); // Send error if user is not found
    }

    res.status(200).json(deletedUser); // Send deleted user data in response
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: error.message }); // Send error response in case of failure
  }
};

// Controller method to check if a username exists
const checkUsernameExists = async (req, res) => {
  try {
    const username = req.params.username; // Extract username from request parameters
    const exists = await UserService.checkUsernameExists(username); // Check if username exists
    res.status(200).json({ exists }); // Send existence status in response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response in case of failure
  }
};

// Controller method to get a user's profile picture by username
const getPictureByUsername = async (req, res) => {
  try {
    const username = req.params.username; // Extract username from request parameters
    const profilePicture = await UserService.getPictureByUsername(username); // Get profile picture by username
    res.status(200).json({ profilePicture }); // Send profile picture in response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response in case of failure
  }
};

// Controller method to get videos by uploader ID
const getVideosByUploader = async (req, res) => {
  try {
    const uploader = req.params.id; // Extract uploader ID from request parameters
    const videos = await UserService.getVideosByUploader(uploader); // Get videos by uploader ID
    res.status(200).json(videos); // Send videos in response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response in case of failure
  }
};

// Export the controller methods to be used in routes
module.exports = {
  createUser, 
  getUserByUsername, 
  updateUser, 
  deleteUser, 
  checkUsernameExists,
  getPictureByUsername,
  updatePassword,
  getVideosByUploader,
};
