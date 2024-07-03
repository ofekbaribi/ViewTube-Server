const express = require('express');
const videoController = require('../controllers/videoController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Created uploads directory');
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Save videos in the 'public/uploads' directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.route('/')
    .get(videoController.getVideos)
    .post(upload.single('videoFile'), videoController.createVideo);

router.route('/:id')
    .get(videoController.getVideo)
    .patch(videoController.updateVideo)
    .delete(videoController.deleteVideo);

router.route('/:id/like')
    .post(videoController.userLiked);

module.exports = router;
