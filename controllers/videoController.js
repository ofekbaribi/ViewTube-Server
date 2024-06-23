const videoService = require('../services/videoService');

const createVideo = async (req, res) => {
    res.json(await videoService.createVideo(req.body.title));
};

const getVideos = async (req, res) => {
    res.json(await videoService.getVideos());
};

const getVideo = async (req, res) => {
    const video = await videoService.getVideoById(req.params.id);
    if (!video) {
    return res.status(404).json({ errors: ['Video not found'] });
    }

    res.json(video);
};

module.exports = {createVideo, getVideos, getVideo, updateVideo, deleteVideo };