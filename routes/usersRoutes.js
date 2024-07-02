const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateJWT } = require('../services/tokenService');
const router = express.Router();

// Define routes for user operations
router.post('/', UserController.createUser); // Creates a user
router.get('/:username', UserController.getUserByUsername); // Get the user details for the profile page
router.put('/:username', authenticateJWT, UserController.updateUser); // Updates the user details
router.delete('/:username', authenticateJWT, UserController.deleteUser); // Deletes the user account
router.get('/check/:username', UserController.checkUsernameExists); // Checks username availability for registration
router.get('/picture/:username', UserController.getPictureByUsername); // Get the profile picture for the video details

module.exports = router;
