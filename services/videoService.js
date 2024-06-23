const Video = require('../models/videoSchema');

const createVideo = async (title, published) => {
    const video = new Video({ title : title });
    if (published) video.published = published;
    return await video.save();
};

const getVideoById = async (id) => { return await Video.findById(id); };

const getVideos = async () => { return await Video.find({}); };

const updateVideo = async (id, title) => {
    const video = await getVideoById(id);
    if (!video) return null;
    video.title = title;
    await video.save();
    return video;
};

const deleteVideo= async (id) => {
    const video = await getVideoById(id);
    if (!video) return null;
    await video.remove();
    return video;
};

module.exports = {createVideo, getVideoById, getVideos, updateVideo, deleteVideo }