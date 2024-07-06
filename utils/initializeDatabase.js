const Video = require('../models/videoSchema');
const { formatDate } = require('../services/videoService');

const initialVideos = [
    {
        id: 1,
        title: "Mallorca sunrise summer vibes - KYGO, ChainSmokers, Bhaskar, Robin Schulz, Gryffin, Lost Frequencies",
        description: "Dancing cats",
        uploader: "ofekbaribi",
        views: 460,
        likes: 6,
        date: formatDate("2020-04-26"),
        duration: 5083,
        videoUrl: "/media/feel.mp4"
    },
    {   
        id: 2,
        title: "Feel So Close x Roses x Summer x I Love It MASHUP",
        description: "Summer Mashup Vol.1 (Feel so Close Hudszn Remix)",
        uploader: "zivelbaz",
        views: 100,
        likes: 354,
        date: formatDate("2021-05-26"),
        duration: 4223,
        videoUrl: "/media/deep.mp4"
    },
    {
        id: 3,
        title: "Harbu Darbu (Prod. By Stilla)",
        description: "harbu darbu",
        uploader: "yuvalmaaravi",
        views: 40,
        likes: 200,
        date: formatDate("2021-05-26"),
        duration: 3159,
        videoUrl: "/media/video2.mp4"
    },
    {
        id: 4,
        title: "AM I WRONG || REMIX 2024",
        description: "check this🔥",
        uploader: "ofekbaribi",
        views: 999,
        likes: 200,
        date: formatDate("2021-05-26"),
        duration: 4223,
        videoUrl: "/media/wrong.mp4"
    },
    {
        id: 5,
        title: "Jonas Blue, Galantis, Zoe Wees - Mountains (Official Audio)",
        description: "Jonas Blue, Galantis, Zoe Wees - Mountains (Official Lyric Video)",
        uploader: "zivelbaz",
        views: 111,
        likes: 1111,
        date: formatDate("2021-11-11"),
        duration: 4271,
        videoUrl: "/media/mountains.mp4"
    },
    {
        id: 6,
        title: "Payphone - Maroon 5 (Lyrics - No rap)",
        description: "Jonas Blue, Galantis, Zoe Wees - Mountains (Official Lyric Video)",
        uploader: "yuvalmaaravi",
        views: 106,
        likes: 124,
        date: formatDate("2024-01-19"),
        duration: 191,
        videoUrl: "/media/payphone.mp4"
    },
    {
        id: 7,
        title: "Calvin Harris - Summer (Lyrics)",
        description: "🎵 Follow the official 7clouds playlist on Spotify : http://spoti.fi/2SJsUcZ 🎧 Calvin Harris - Summer (Lyrics)⏬ Download / Stream: https://open.spotify.com/track/6YUTL4...🔔 Turn on notifications to stay updated with new uploads!",
        uploader: "ofekbaribi",
        views: 106,
        likes: 124,
        date: formatDate("2024-01-19"),
        duration: 191,
        videoUrl: "/media/summer.mp4"
    },
    {
        id: 8,
        title: "Wake Me Up x Beautiful life remix",
        description: "🎵 Follow the official 7clouds playlist on Spotify ",
        uploader: "zivelbaz",
        views: 106,
        likes: 124,
        date: formatDate("2024-01-19"),
        duration: 191,
        videoUrl: "/media/wake.mp4"
    },
    {
        id: 9,
        title: "Whistle - Flo Rida [Vietsub + Lyrics]",
        description: "🎵 Follow the official 7clouds playlist on Spotify ",
        uploader: "yuvalmaaravi",
        views: 106,
        likes: 124,
        date: formatDate("2024-01-19"),
        duration: 191,
        videoUrl: "/media/whistle.mp4"
    },
    {
        id: 10,
        title: "Pantropiko x Shape of You remix",
        description: "🎵 Follow the official 7clouds playlist on Spotify ",
        uploader: "ofekbaribi",
        views: 106,
        likes: 124,
        date: formatDate("2024-01-19"),
        duration: 191,
        videoUrl: "/media/shape.mp4"
    }
];

async function initializeDatabase() {
    try {
        const count = await Video.countDocuments();
        if (count === 0) {
            await Video.insertMany(initialVideos);
            console.log("Initial videos inserted.");
        } else {
            console.log("Videos already initialized.");
        }
    } catch (err) {
        console.error("Error initializing database:", err);
    }
}

module.exports = initializeDatabase