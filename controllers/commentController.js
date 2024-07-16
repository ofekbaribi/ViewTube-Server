const commentService = require('../services/commentService');

// Handler to create a new comment
const createComment = async (req, res) => {
  try {
    // Call the service to create a comment and send the response
    res.json(await commentService.createComment(req.body.text, req.body.uploader, req.body.videoId));
  } catch (error) {
    // Send an error response in case of failure
    res.status(500).json({ error: error.message });
  }
};

// Handler to get comments for a specific video by video ID
const getCommentsByVideoId = async (req, res) => {
  // Call the service to get comments by video ID
  const comment = await commentService.getCommentsByVideoId(req.params.videoId);
  if (!comment) {
    // Send a 404 response if comments are not found
    return res.status(404).json({ errors: ['comments not found'] });
  }

  // Send the comments as the response
  res.json(comment);
};

// Handler to update an existing comment
const updateComment = async (req, res) => {
  try {
    const { id } = req.params; // Extract comment ID from request parameters
    const { text, videoId } = req.body; // Extract new text and video ID from request body
    // Call the service to update the comment
    const comment = await commentService.updateComment(id, text, videoId);
    if (!comment) {
      // Send a 404 response if the comment is not found
      return res.status(404).json({ error: 'Comment not found' });
    }
    // Send the updated comment as the response
    res.status(200).json(comment);
  } catch (error) {
    // Send an error response in case of failure
    res.status(500).json({ error: error.message });
  }
};

// Handler to delete a comment
const deleteComment = async (req, res) => {
  try {
    const { id } = req.params; // Extract comment ID from request parameters
    const { videoId } = req.query; // Extract video ID from query parameters
    // Call the service to delete the comment
    const deleted = await commentService.deleteComment(id, videoId);
    if (!deleted) {
      // Send a 404 response if the comment is not found
      return res.status(404).json({ error: 'Comment not found' });
    }
    // Send a success message if the comment is deleted
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    // Send an error response in case of failure
    res.status(500).json({ error: error.message });
  }
};

// Export the handlers to be used in routes
module.exports = { createComment, getCommentsByVideoId, updateComment, deleteComment };
