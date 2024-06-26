const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Video = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploader: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    videoUrl: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Video', Video);
