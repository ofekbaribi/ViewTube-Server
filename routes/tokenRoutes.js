const express = require('express');
const { loginUser, verifyUserToken } = require('../controllers/tokenController');
const router = express.Router();

// POST request to login a user
router.post('/', loginUser);

// POST request to verify user token
router.post('/verifyToken', verifyUserToken);

module.exports = router;
