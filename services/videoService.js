const Video = require('../models/videoSchema'); // Import the Video model
const fs = require('fs'); // Import Node.js file system module
const path = require('path'); // Import Node.js path module
const Comment = require('../models/commentSchema'); // Import the Comment model

/**
 * Function to create a new video.
 * @param {string} title - The title of the video.
 * @param {string} description - The description of the video.
 * @param {string} uploader - The uploader of the video.
 * @param {number} duration - The duration of the video in seconds.
 * @param {string} videoUrl - The URL/path of the video file.
 * @param {string} thumbnailUrl - The URL/path of the thumbnail image.
 * @returns {Promise<object>} The newly created video object.
 */
const createVideo = async (title, description, uploader, duration, videoUrl, thumbnailUrl) => {
    const maxId = await getMaxVideoId() + 1; // Get the current max ID and increment by 1
    const todayDateString = formatDate(new Date()); // Format today's date as a string
    const video = new Video({
        id: maxId,
        title: title,
        description: description,
        uploader: uploader,
        duration: duration,
        date: todayDateString,
        videoUrl: `/uploads/${videoUrl.split('\\')[videoUrl.split('\\').length - 1]}`, // Format video URL
        thumbnail: `/uploads/thumbnails/${thumbnailUrl.split('\\')[thumbnailUrl.split('\\').length - 1]}` // Format thumbnail URL
    });
    return await video.save(); // Save the new video to the database and return it
};

/**
 * Function to fetch all videos.
 * @returns {Promise<Array<object>>} Array of video objects.
 */
const getVideos = async () => {
    return await Video.find({}); // Find all videos in the database
};

/**
 * Function to fetch a video by its ID.
 * @param {number} id - The ID of the video to fetch.
 * @returns {Promise<object|null>} The video object if found, otherwise null.
 */
const getVideoById = async (id) => {
    return await Video.findOne({ id: id }); // Find a video by its ID
};

/**
 * Function to fetch all videos uploaded by a specific uploader.
 * @param {string} uploader - The username of the uploader.
 * @returns {Promise<Array<object>>} Array of video objects uploaded by the specified uploader.
 */
const getVideosByUploader = async (uploader) => {
    return await Video.find({ uploader: uploader }); // Find all videos uploaded by the specified uploader
};

/**
 * Function to update a video's title and description.
 * @param {number} id - The ID of the video to update.
 * @param {string} title - The updated title of the video.
 * @param {string} description - The updated description of the video.
 * @returns {Promise<object|null>} The updated video object if found and updated, otherwise null.
 */
const updateVideo = async (id, title, description) => {
    const video = await getVideoById(id); // Find the video by its ID
    if (!video) {
        return null; // Return null if video not found
    }
    video.title = title; // Update the video title
    video.description = description; // Update the video description
    await video.save(); // Save the updated video
    return video; // Return the updated video object
};

/**
 * Function to delete a video by its ID.
 * @param {number} id - The ID of the video to delete.
 * @returns {Promise<object|null>} The deleted video object if found and deleted, otherwise null.
 */
const deleteVideo = async (id) => {
    const video = await getVideoById(id); // Find the video by its ID
    if (!video) {
        return null; // Return null if video not found
    }

    await Comment.deleteMany({ videoId: id }); // Delete all comments associated with the video

    const videoPath = path.join(__dirname, '..', 'public', video.videoUrl); // Construct video file path
    const thumbnailPath = path.join(__dirname, '..', 'public', video.thumbnail); // Construct thumbnail file path
    fs.unlink(videoPath, (err) => { // Delete video file
        if (err) {
            console.error('Error deleting video file:', err);
        }
    });
    fs.unlink(thumbnailPath, (err) => { // Delete thumbnail file
        if (err) {
            console.error('Error deleting thumbnail file:', err);
        }
    });

    await video.deleteOne(); // Delete the video document from the database
    return video; // Return the deleted video object
};

/**
 * Function to get the maximum ID currently in the videos collection.
 * @returns {Promise<number>} The maximum ID found in the videos collection, or 0 if no videos exist.
 */
const getMaxVideoId = async () => {
    const maxIdVideo = await Video.findOne().sort({ id: -1 }).exec(); // Find the video with the highest ID
    return maxIdVideo ? maxIdVideo.id : 0; // Return the max ID or 0 if no videos exist
};

/**
 * Function to format a date string to DD/MM/YYYY format.
 * @param {string} dateString - The date string to format.
 * @returns {string} Formatted date string in DD/MM/YYYY format.
 */
const formatDate = (dateString) => {
    const date = new Date(dateString); // Create a Date object from the date string
    const day = String(date.getDate()).padStart(2, '0'); // Get day with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month with leading zero if necessary
    const year = date.getFullYear(); // Get full year
    return `${day}/${month}/${year}`; // Return formatted date string
};

/**
 * Function to handle user likes/unlikes on a video.
 * @param {number} id - The ID of the video to like/unlike.
 * @param {string} username - The username of the user performing the action.
 * @returns {Promise<boolean>} True if the operation was successful.
 * @throws {Error} If the video with the given ID is not found.
 */
const userLiked = async (id, username) => {
    const video = await getVideoById(id); // Find the video by its ID
    if (!video) {
        throw new Error('Video not found'); // Throw error if video not found
    }
    if (video.likedBy.includes(username)) {
        video.likes--; // Decrease likes if user already liked the video
        video.likedBy = video.likedBy.filter(likedBy => likedBy !== username); // Remove user from likedBy array
    } else {
        video.likes++; // Increase likes if user is liking the video
        video.likedBy.push(username); // Add user to likedBy array
    }
    await video.save(); // Save the updated video document
    return true; // Return true to indicate success
};

/**
 * Function to increment the view count of a video.
 * @param {number} id - The ID of the video to increment view count.
 * @returns {Promise<object>} The updated video object with incremented view count.
 * @throws {Error} If the video with the given ID is not found.
 */
const addViewCount = async (id) => {
    const video = await getVideoById(id); // Find the video by its ID
    if (!video) {
        throw new Error('Video not found'); // Throw error if video not found
    }
    video.views++; // Increment the view count
    await video.save(); // Save the updated video document
    return video; // Return the updated video object
};

/**
 * Function to fetch hot videos based on view counts.
 * @returns {Promise<Array<object>>} Array of video objects, including top viewed and random videos.
 * @throws {Error} If there is an error fetching or shuffling videos.
 */
const getHotVideos = async () => {
    try {
        const videos = await getVideos(); // Fetch all videos
        if (videos.length <= 10) {
            return await shuffleArray(videos); // If less than or equal to 10 videos, shuffle and return
        }

        // Get the top 10 most viewed videos
        const hotVideos = videos.sort((a, b) => b.views - a.views).slice(0, 10);
        // Get the remaining videos excluding the top 10 most viewed
        const remainingVideos = videos.filter(video => !hotVideos.includes(video));
        // Shuffle the remaining videos
        const shuffledRemainingVideos = await shuffleArray(remainingVideos);
        // Get 10 random videos from the remaining ones
        const randomVideos = shuffledRemainingVideos.slice(0, Math.min(10, shuffledRemainingVideos.length));
        // Combine the hot and random videos
        const combinedVideos = [...hotVideos, ...randomVideos];
        // Shuffle the combined list before returning
        return await shuffleArray(combinedVideos);
    } catch (error) {
        throw new Error(`Error fetching hot videos: ${error.message}`); // Throw error if any exception occurs
    }
};

/**
 * Function to shuffle an array using the Fisher-Yates algorithm.
 * @param {Array} array - The array to shuffle.
 * @returns {Array} Shuffled array.
 */
function shuffleArray(array) {
    const shuffledArray = array.slice(); // Create a copy to avoid mutating the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate random index
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
    }
    return shuffledArray; // Return shuffled array
}

// Export the video service functions
module.exports = { createVideo, getVideoById, getVideos, updateVideo, deleteVideo, formatDate, userLiked, addViewCount, getHotVideos, getVideosByUploader };
