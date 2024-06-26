const Video = require('../models/videoSchema');

const createVideo = async (title, description, uploader, duration, videoUrl) => {
    const maxId = await getMaxVideoId();
    const video = new Video({id: maxId, title : title, description : description, uploader : uploader, duration : duration, videoUrl : videoUrl});
    return await video.save();
}

const getVideos = async () => { 
    return await Video.find({}); 
};

const getVideoById = async (id) => {
    return await Video.findOne({id: id});
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

const getMaxVideoId = async () => {
    const maxIdVideo = await Video.findOne().sort({ id: -1 }).exec();
    return maxIdVideo ? maxIdVideo.id : 0;
};

module.exports = {createVideo, getVideoById, getVideos, updateVideo, deleteVideo }