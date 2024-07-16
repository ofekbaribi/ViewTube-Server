const videoService = require('../services/videoService');

// Controller method to handle creating a new video
const createVideo = async (req, res) => {
  try {
    const { title, description, duration, uploader } = req.body; // Extract video details from request body
    const videoFile = req.files['videoFile'][0]; // Extract video file from request files
    const thumbnail = req.files['thumbnail'][0]; // Extract thumbnail file from request files

    const videoUrl = videoFile.path; // Get video file path
    const thumbnailUrl = thumbnail.path; // Get thumbnail file path

    // Create new video using videoService
    const newVideo = await videoService.createVideo(title, description, uploader, duration, videoUrl, thumbnailUrl);
    res.status(201).json(newVideo); // Send the newly created video as response
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error response in case of failure
  }
};

// Controller method to handle getting all videos
const getVideos = async (_, res) => {
  res.json(await videoService.getVideos()); // Get all videos using videoService and send as response
};

// Controller method to handle getting a single video by ID
const getVideo = async (req, res) => {
  const video = await videoService.getVideoById(req.params.id); // Get video by ID using videoService
  if (!video) {
    return res.status(404).json({ errors: ['Video not found'] }); // Send 404 response if video is not found
  }

  res.json(video); // Send the found video as response
};

// Controller method to handle updating a video by ID
const updateVideo = async (req, res) => {
  const id = req.params.id; // Extract video ID from request parameters
  const { title, description } = req.body; // Extract updated title and description from request body
  const video = await videoService.updateVideo(id, title, description); // Update video using videoService
  if (!video) {
    return res.status(404).json({ errors: ['Video not found'] }); // Send 404 response if video is not found
  }
  res.json(video); // Send the updated video as response
};

// Controller method to handle liking a video
const userLiked = async (req, res) => {
  const { id } = req.params; // Extract video ID from request parameters
  const { username } = req.body; // Extract username from request body
  try {
    const liked = await videoService.userLiked(id, username); // Like the video using videoService
    res.json({ liked }); // Send like status as response
  } catch (error) {
    res.status(500).json({ errors: [error.message] }); // Send error response in case of failure
  }
};

// Controller method to handle deleting a video by ID
const deleteVideo = async (req, res) => {
  const video = await videoService.deleteVideo(req.params.id); // Delete video by ID using videoService
  if (!video) {
    return res.status(404).json({ errors: ['Video not found'] }); // Send 404 response if video is not found
  }
  res.json(video); // Send the deleted video as response
};

// Controller method to handle adding view count to a video by ID
const addViewCount = async (req, res) => {
  const video = await videoService.addViewCount(req.params.id); // Add view count to video by ID using videoService
  if (!video) {
    return res.status(404).json({ errors: ['Video not found'] }); // Send 404 response if video is not found
  }
  res.json(video); // Send the updated video as response
};

// Controller method to handle getting hot (popular) videos
const getHotVideos = async (req, res) => {
  try {
    const videos = await videoService.getHotVideos(); // Get hot videos using videoService
    res.json(videos); // Send hot videos as response
  } catch (error) {
    res.status(500).json({ errors: [error.message] }); // Send error response in case of failure
  }
};

// Export the controller methods to be used in routes
module.exports = { 
  createVideo, 
  getVideos, 
  getVideo, 
  updateVideo, 
  deleteVideo, 
  userLiked, 
  addViewCount, 
  getHotVideos 
};
