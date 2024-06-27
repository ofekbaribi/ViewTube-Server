const express = require('express');
const { loginUser, verifyToken } = require('../controllers/tokenController');
const router = express.Router();

// Define route for logging in
router.post('/', loginUser);
router.post('/verifyToken', verifyToken);

module.exports = router;
