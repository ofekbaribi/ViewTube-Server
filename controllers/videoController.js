const videoService = require('../services/videoService');

const createVideo = async (req, res) => {
    res.json(await videoService.createVideo(req.body.title, req.body.description, req.body.uploader, req.body.duration, req.body.videoUrl));
};

const getVideos = async (_, res) => {
    res.json(await videoService.getVideos());
};

const getVideo = async (req, res) => {
    const video = await videoService.getVideoById(req.params.id);
    if (!video) {
    return res.status(404).json({ errors: ['Video not found'] });
    }

    res.json(video);
};

const updateVideo = async (req, res) => {
    const video = await videoService.updateVideo(req,param.id, req.body.title, req.body.description);
    if(!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
};

const deleteVideo = async (req, res) => {
    const video = await videoService.deleteVideo(req.params.id);
    if (!video) {
        return res.status(404).json({ errors: ['Video not found'] });
    }
    res.json(video);
}

module.exports = {createVideo, getVideos, getVideo, updateVideo, deleteVideo };