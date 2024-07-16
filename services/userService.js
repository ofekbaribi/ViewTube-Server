const User = require('../models/userSchema'); // Import the User model
const Comment = require('../models/commentSchema'); // Import the Comment model
const Video = require('../models/videoSchema'); // Import the Video model
const VideoService = require('./videoService'); // Import the video service
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing

/**
 * Create a new user.
 * @param {object} userData - User data including username, password, firstName, lastName.
 * @returns {Promise<{user, token}>} - Created user object and authentication token.
 * @throws {Error} - If there's an error creating the user.
 */
const createUser = async (userData) => {
  try {
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    userData.password = hashedPassword;

    // Capitalize first letters of first and last names
    userData.firstName = userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1);
    userData.lastName = userData.lastName.charAt(0).toUpperCase() + userData.lastName.slice(1);

    const user = new User(userData);
    await user.save();

    // Generate a token for the user
    const tokenController = require('../controllers/tokenController');
    const token = tokenController.generateToken(user);

    return { user, token };
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

/**
 * Authenticate a user with username and password.
 * @param {string} username - Username of the user to authenticate.
 * @param {string} password - Password of the user.
 * @returns {Promise<object>} - Authenticated user object.
 * @throws {Error} - If user is not found or password is incorrect.
 */
const authenticateUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }
    return user;
  } catch (error) {
    throw new Error(`Error authenticating user: ${error.message}`);
  }
};

/**
 * Get a user by username.
 * @param {string} username - Username of the user to fetch.
 * @returns {Promise<object>} - User object.
 * @throws {Error} - If user is not found.
 */
const getUserByUsername = async (username) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    user.password = null; // Remove password from the user object before returning
    return user;
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
};

/**
 * Update a user's first name and last name by username.
 * @param {string} username - Username of the user to update.
 * @param {string} firstName - New first name.
 * @param {string} lastName - New last name.
 * @returns {Promise<object>} - Updated user object.
 * @throws {Error} - If user is not found or update fails.
 */
const updateUser = async (username, firstName, lastName) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    // Capitalize first letters of first and last names
    user.firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    user.lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

/**
 * Delete a user by username.
 * @param {string} username - Username of the user to delete.
 * @returns {Promise<object>} - Deleted user object.
 * @throws {Error} - If user is not found or deletion fails.
 */
const deleteUser = async (username) => {
  try {
    // Delete user's videos first
    const userVideos = await VideoService.getVideosByUploader(username);
    if (userVideos) {
      for (const video of userVideos) {
        await VideoService.deleteVideo(video.id);
      }
    }

    // Delete user's comments
    await Comment.deleteMany({ uploader: username });

    // Delete the user
    const user = await User.findOne({ username: username });
    if (!user) {
      throw new Error('User not found');
    }
    await user.deleteOne();
    return user;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

/**
 * Check if a username exists.
 * @param {string} username - Username to check.
 * @returns {Promise<boolean>} - true if username exists, false otherwise.
 * @throws {Error} - If there's an error checking the username.
 */
const checkUsernameExists = async (username) => {
  try {
    const user = await User.findOne({ username });
    return user ? true : false;
  } catch (error) {
    throw new Error(`Error checking username: ${error.message}`);
  }
};

/**
 * Get user's profile picture URL by username.
 * @param {string} username - Username of the user.
 * @returns {Promise<string|null>} - Profile picture URL or null if user not found.
 * @throws {Error} - If there's an error fetching the profile picture.
 */
const getPictureByUsername = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    return user ? user.image : null;
  } catch (error) {
    throw new Error(`Error fetching user's profile picture: ${error.message}`);
  }
};

/**
 * Update user's password by username.
 * @param {string} username - Username of the user.
 * @param {string} newPassword - New password to update.
 * @returns {Promise<object>} - Updated user object.
 * @throws {Error} - If user is not found or password update fails.
 */
const updatePassword = async (username, newPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    user.password = hashedPassword;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error updating password: ${error.message}`);
  }
};

/**
 * Get videos uploaded by a specific user.
 * @param {string} uploader - Username of the uploader.
 * @returns {Promise<object[]>} - Array of video objects uploaded by the user.
 * @throws {Error} - If there's an error fetching the videos.
 */
const getVideosByUploader = async (uploader) => {
  try {
    const videos = await Video.find({ uploader: uploader });
    return videos;
  } catch (error) {
    throw new Error(`Error fetching videos by uploader: ${error.message}`);
  }
};

/**
 * Update user's profile picture by username.
 * @param {string} username - Username of the user.
 * @param {string} image - New profile picture URL.
 * @returns {Promise<object>} - Updated user object.
 * @throws {Error} - If there's an error updating the profile picture.
 */
const updateProfilePicture = async (username, image) => {
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }
    user.image = image;
    await user.save();
    user.password = null; // Remove password from the user object before returning
    return user;
  } catch (error) {
    throw new Error(`Error updating profile picture: ${error.message}`);
  }
};

// Export all user service functions
module.exports = {
  createUser,
  authenticateUser,
  getUserByUsername,
  updateUser,
  deleteUser,
  checkUsernameExists,
  getPictureByUsername,
  updatePassword,
  getVideosByUploader,
  updateProfilePicture
};
