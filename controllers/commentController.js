const commentService = require('../services/commentService');

const createComment = async (req, res) => {
  try {
    res.json(await commentService.createComment(req.body.id, req.body.text, req.body.uploader, req.body.videoId));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCommentsByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;
    const comments = await commentService.getCommentsByVideoId(videoId);
    res.json(comments ? comments : []);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await commentService.updateComment(id, text);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentService.deleteComment(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createComment, getCommentsByVideoId, updateComment, deleteComment };
