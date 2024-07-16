const express = require('express');
const videoController = require('../controllers/videoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const videosDir = path.join(__dirname, '..', 'public', 'uploads');
const thumbnailsDir = path.join(__dirname, '..', 'public', 'uploads', 'thumbnails');

if (!fs.existsSync(videosDir)) {
    fs.mkdirSync(videosDir, { recursive: true }); // Create 'public/uploads' directory recursively if it doesn't exist
    console.log('Created videos directory');
}

if (!fs.existsSync(thumbnailsDir)) {
    fs.mkdirSync(thumbnailsDir, { recursive: true }); // Create 'public/uploads/thumbnails' directory recursively if it doesn't exist
    console.log('Created thumbnails directory');
}

// Multer storage configuration for saving uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'videoFile') {
            cb(null, videosDir); // Save videos in the 'public/uploads' directory
        } else if (file.fieldname === 'thumbnail') {
            cb(null, thumbnailsDir); // Save thumbnails in the 'public/uploads/thumbnails' directory
        }
    },
    filename: (req, file, cb) => {
        if (file.fieldname === 'videoFile') {
            cb(null, `${Date.now()}-${file.originalname}`); // Keep the original video filename with a timestamp prefix
        } else if (file.fieldname === 'thumbnail') {
            cb(null, `${Date.now()}-${file.originalname}`); // Format thumbnail filename with a timestamp prefix
        }
    },
});

const upload = multer({ storage: storage }); // Multer instance with configured storage

const router = express.Router(); // Create a new router instance

// Route definitions with corresponding controller methods
router.route('/')
    .get(videoController.getHotVideos) // GET request to fetch hot videos
    .post(upload.fields([
        { name: 'videoFile', maxCount: 1 }, // Upload single video file
        { name: 'thumbnail', maxCount: 1 } // Upload single thumbnail file
    ]), videoController.createVideo); // POST request to create a new video

router.route('/:id/like')
    .post(videoController.userLiked); // POST request to toggle user like on a video by ID

router.route('/:id/view')
    .patch(videoController.addViewCount); // PATCH request to increment view count of a video by ID

router.route('/all')
    .get(videoController.getVideos); // GET request to fetch all videos
    
module.exports = router;
