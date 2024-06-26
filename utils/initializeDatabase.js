const Video = require('../models/videoSchema');

const initialVideos = [
    {
        title: "Mallorca sunrise summer vibes - KYGO, ChainSmokers, Bhaskar, Robin Schulz, Gryffin, Lost Frequencies",
        description: "Dancing cats",
        uploader: "Ofek Baribi",
        views: 460,
        likes: 6,
        date: new Date("2021-05-26"),
        duration: 5083,
        videoUrl: "/media/feel.mp4"
    },
    {
        title: "Feel So Close x Roses x Summer x I Love It MASHUP",
        description: "Summer Mashup Vol.1 (Feel so Close Hudszn Remix)",
        uploader: "Ziv Elbaz",
        views: 100,
        likes: 354,
        date: new Date("2021-05-26"),
        duration: 4223,
        videoUrl: "/media/deep.mp4"
    },
    {
        title: "Harbu Darbu (Prod. By Stilla)",
        description: "harbu darbu",
        uploader: "Ness Ve Stilla",
        views: 40,
        likes: 200,
        date: new Date("2021-05-26"),
        duration: 3159,
        videoUrl: "/media/video2.mp4"
    },
    {
        title: "AM I WRONG || REMIX 2024",
        description: "check this🔥",
        uploader: "Author 404",
        views: 999,
        likes: 200,
        date: new Date("2021-05-26"),
        duration: 4223,
        videoUrl: "/media/wrong.mp4"
    },
    {
        title: "Jonas Blue, Galantis, Zoe Wees - Mountains (Official Audio)",
        description: "Jonas Blue, Galantis, Zoe Wees - Mountains (Official Lyric Video)",
        uploader: "CS biu",
        views: 111,
        likes: 1111,
        date: new Date("2021-11-11"),
        duration: 4271,
        videoUrl: "/media/mountains.mp4"
    },
    {
        title: "Payphone - Maroon 5 (Lyrics - No rap)",
        description: "Jonas Blue, Galantis, Zoe Wees - Mountains (Official Lyric Video)",
        uploader: "Maroon 5",
        views: 106,
        likes: 124,
        date: new Date("2024-01-19"),
        duration: 191,
        videoUrl: "/media/payphone.mp4"
    },
    {
        title: "Calvin Harris - Summer (Lyrics)",
        description: "🎵 Follow the official 7clouds playlist on Spotify : http://spoti.fi/2SJsUcZ ​🎧 Calvin Harris - Summer (Lyrics)⏬ Download / Stream: https://open.spotify.com/track/6YUTL4...🔔 Turn on notifications to stay updated with new uploads!",
        uploader: "Calvin Harris",
        views: 106,
        likes: 124,
        date: new Date("2024-01-19"),
        duration: 191,
        videoUrl: "/media/summer.mp4"
    },
    {
        title: "Wake Me Up x Beautiful life remix",
        description: "🎵 Follow the official 7clouds playlist on Spotify ",
        uploader: "CS biu",
        views: 106,
        likes: 124,
        date: new Date("2024-01-19"),
        duration: 191,
        videoUrl: "/media/wake.mp4"
    },
    {
        title: "Whistle - Flo Rida [Vietsub + Lyrics]",
        description: "🎵 Follow the official 7clouds playlist on Spotify ",
        uploader: "CS biu",
        views: 106,
        likes: 124,
        date: new Date("2024-01-19"),
        duration: 191,
        videoUrl: "/media/whistle.mp4"
    },
    {
        title: "Pantropiko x Shape of You remix",
        description: "🎵 Follow the official 7clouds playlist on Spotify ",
        uploader: "CS biu",
        views: 106,
        likes: 124,
        date: new Date("2024-01-19"),
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

module.exports = initializeDatabase;
