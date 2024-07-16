const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// POST request to create a new comment
router.post('/', commentController.createComment);

// GET request to retrieve all comments for a specific video by videoId
router.get('/video/:videoId', commentController.getCommentsByVideoId);

// PATCH request to update a comment by its ID
router.patch('/:id', commentController.updateComment);

// DELETE request to delete a comment by its ID
router.delete('/:id', commentController.deleteComment);


module.exports = router;
