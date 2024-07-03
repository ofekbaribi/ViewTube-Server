const Video = require('../models/videoSchema');
const fs = require('fs');
const path = require('path');

const createVideo = async (title, description, uploader, duration, videoUrl) => {
    const maxId = await getMaxVideoId() + 1;
    const todayDateString = formatDate(new Date());
    const video = new Video({
        id: maxId,
        title: title,
        description: description,
        uploader: uploader,
        duration: duration,
        date: todayDateString,
        videoUrl: `/uploads/${videoUrl.split('\\')[videoUrl.split('\\').length - 1]}`
    });
    return await video.save();
}

const getVideos = async () => { 
    return await Video.find({}); 
};

const getVideoById = async (id) => {
    return await Video.findOne({id: id});
};

const getVideosByUploader = async (uploader) => {
    return await Video.find({uploader: uploader});
};

const updateVideo = async (id, title, description) => {
    const video = await getVideoById(id);   
    if (!video) { 
        return null;
    }
    video.title = title;
    video.description = description;
    await video.save();
    return video;
};

const deleteVideo = async (id) => {
    const video = await getVideoById(id);
    if (!video) return null;

    const videoPath = path.join(__dirname, '..', 'public', video.videoUrl);
    fs.unlink(videoPath, (err) => {
        if (err) {
            console.error('Error deleting video file:', err);
        }
    });

    await video.deleteOne();
    return video;
};

const getMaxVideoId = async () => {
    const maxIdVideo = await Video.findOne().sort({ id: -1 }).exec();
    return maxIdVideo ? maxIdVideo.id : 0;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const userLiked = async (id, username) => {
    const video = await getVideoById(id);
    if (!video) {
        throw new Error('Video not found');
    }
    if (video.likedBy.includes(username)) {
        video.likes--;
        video.likedBy = video.likedBy.filter(likedBy => likedBy !== username);
    } else {
        video.likes++;
        video.likedBy.push(username);
    }
    await video.save();
    return true;
};

module.exports = {createVideo, getVideoById, getVideosByUploader, getVideos, updateVideo, deleteVideo, formatDate, userLiked };
