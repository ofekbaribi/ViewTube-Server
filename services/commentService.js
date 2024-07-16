const Comment = require('../models/commentSchema'); // Import the Comment model

/**
 * Function to create a new comment.
 * @param {string} text - The text content of the comment.
 * @param {string} uploader - The uploader of the comment.
 * @param {number} videoId - The ID of the video associated with the comment.
 * @returns {Promise<object>} The newly created comment object.
 */
const createComment = async (text, uploader, videoId) => {
  const maxId = await getCommentsMaxId() + 1; // Get the current max ID and increment by 1
  const comment = new Comment({ id: maxId, text: text, uploader: uploader, videoId: videoId }); // Create a new Comment instance
  return await comment.save(); // Save the new comment to the database and return it
};

/**
 * Function to get all comments for a specific video by video ID.
 * @param {number} videoId - The ID of the video to fetch comments for.
 * @returns {Promise<Array<object>>} Array of comment objects for the given video ID.
 */
const getCommentsByVideoId = async (videoId) => {
  return await Comment.find({ videoId: videoId }); // Find all comments with the given videoId
};

/**
 * Function to update a comment by its ID and video ID.
 * @param {number} id - The ID of the comment to update.
 * @param {string} text - The updated text content of the comment.
 * @param {number} videoId - The ID of the video associated with the comment.
 * @returns {Promise<object>} The updated comment object.
 * @throws {Error} If the comment with the given ID and video ID is not found.
 */
const updateComment = async (id, text, videoId) => {
  const videoComments = await getCommentsByVideoId(videoId); // Get all comments for the given videoId
  const comment = videoComments.find((comment) => comment.id == id); // Find the comment with the given id
  if (!comment) {
    throw new Error('Comment not found'); // Throw an error if the comment is not found
  } else {
    comment.text = text; // Update the comment text
    await comment.save(); // Save the updated comment
    return comment; // Return the updated comment
  }
};

/**
 * Function to delete a comment by its ID and video ID.
 * @param {number} id - The ID of the comment to delete.
 * @param {number} videoId - The ID of the video associated with the comment.
 * @returns {Promise<boolean>} True if the comment is successfully deleted.
 * @throws {Error} If the comment with the given ID and video ID is not found.
 */
const deleteComment = async (id, videoId) => {
  const videoComments = await getCommentsByVideoId(videoId); // Get all comments for the given videoId
  const comment = videoComments.find((comment) => comment.id == id); // Find the comment with the given id
  if (!comment) {
    throw new Error('Comment not found'); // Throw an error if the comment is not found
  } else {
    await comment.deleteOne(); // Delete the comment
    return true; // Return true to indicate successful deletion
  }
};

/**
 * Function to get the maximum ID currently in the comments collection.
 * @returns {Promise<number>} The maximum ID found in the comments collection, or 0 if no comments exist.
 */
const getCommentsMaxId = async () => {
  const maxIdComment = await Comment.findOne().sort({ id: -1 }).exec(); // Find the comment with the highest id
  return maxIdComment ? maxIdComment.id : 0; // Return the max id or 0 if no comments exist
};

// Export the comment service functions
module.exports = { createComment, getCommentsByVideoId, updateComment, deleteComment };
