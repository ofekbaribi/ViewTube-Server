const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateJWT } = require('../services/authenticationService');
const router = express.Router();

// Define routes for user operations
router.post('/', UserController.createUser);
router.get('/:username', authenticateJWT, UserController.getUserByUsername);
router.put('/:username', authenticateJWT, UserController.updateUser);
router.delete('/:username', authenticateJWT, UserController.deleteUser);
router.get('/check/:username', UserController.checkUsernameExists);

module.exports = router;
