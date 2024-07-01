const express = require('express');
var router = express.Router();
const videoController = require('../controllers/videoController');

router.route('/')
    .get(videoController.getVideos)
    .post(videoController.createVideo);

router.route('/:id')
    .get(videoController.getVideo)
    .patch(videoController.updateVideo)
    .delete(videoController.deleteVideo);

router.route('/:id/like')
    .post(videoController.userLiked);

module.exports = router;