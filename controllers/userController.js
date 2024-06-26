const UserService = require('../services/userService');
const { generateToken } = require('../controllers/tokenController');

// Controller method to handle creating a new user
const createUser = async (req, res) => {
    try {
      const userData = req.body;
      const { user, token } = await UserService.createUser(userData); // Destructure user and token
      res.status(201).json({ user, token }); // Send user and token in response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Controller method to handle getting a user by username
const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserService.getUserByUsername(username);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller method to handle updating a user by username
const updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    const updates = req.body;
    const user = await UserService.updateUser(username, updates);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller method to handle deleting a user by username
const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    const user = await UserService.deleteUser(username);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkUsernameExists = async (req, res) => {
    try {
      const username = req.params.username;
      const exists = await UserService.checkUsernameExists(username);
      res.status(200).json({ exists });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = {createUser, getUserByUsername, updateUser, deleteUser, checkUsernameExists};
