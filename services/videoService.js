const Video = require('../models/videoSchema');

const createVideo = async (title, description, uploader, duration, videoUrl) => {
    const video = new Video({title : title, description : description, uploader : uploader, duration : duration, videoUrl : videoUrl});
    return await video.save();
}

const getVideos = async () => { 
    return await Video.find({}); 
};

const getVideoById = async (id) => {
    return await Video.findById(id);
};

const updateVideo = async (id, title, description) => {
    const video = await getVideoById(id);
    if (!video) return null;
    video.title = title;
    video.description = description;
    await video.save();
    return video;
};

const deleteVideo= async (id) => {
    const video = await getVideoById(id);
    if (!video) return null;
    await video.deleteOne();
    return video;
};

module.exports = {createVideo, getVideoById, getVideos, updateVideo, deleteVideo }