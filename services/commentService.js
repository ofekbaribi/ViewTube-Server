const Comment = require('../models/commentSchema');

const createComment = async (id, text, uploader, videoId) => {
  const comment = new Comment({id: id, text: text, uploader: uploader, videoId: videoId});
  return await comment.save();
};

const getCommentsByVideoId = async (videoId) => {
  return await Comment.find({ videoId: videoId });
};

const updateComment = async (id, text) => {
  return await Comment.findByIdAndUpdate(id, { text }, { new: true });
};

const deleteComment = async (id) => {
  return await Comment.findByIdAndDelete(id);
};

module.exports = { createComment, getCommentsByVideoId, updateComment, deleteComment };
