const express = require('express'); // Import Express.js framework
const fs = require('fs'); // Import Node.js file system module
const path = require('path'); // Import Node.js path module

var app = express(); // Create an Express application instance

// Create 'uploads' directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
    console.log('Created uploads directory');
}

const bodyParser = require('body-parser'); // Import body-parser middleware for parsing request bodies

// Middleware to parse urlencoded and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors'); // Import CORS middleware for enabling Cross-Origin Resource Sharing
app.use(cors()); // Enable CORS for all routes

const mongoose = require('mongoose'); // Import Mongoose ORM for MongoDB
const initializeDatabase = require('./utils/initializeDatabase'); // Import database initialization function

require('custom-env').env(process.env.NODE_ENV, './config'); // Load environment variables from custom .env file
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB'); // Log successful MongoDB connection
    initializeDatabase().catch(console.error); // Initialize database schema and data
}).catch(err => {
    console.error('Error connecting to MongoDB:', err); // Log MongoDB connection error
});

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Serve 'media' files from 'public/media' directory
app.use('/media', express.static(path.join(__dirname, 'public', 'media')));

// Import and use routes for videos, comments, users, and token handling
const videos = require('./routes/videosRoutes');
app.use('/api/videos', videos);

const comments = require('./routes/commentsRoutes');
app.use('/api/comments', comments);

const users = require('./routes/usersRoutes');
app.use('/api/users', users);

const token = require('./routes/tokenRoutes');
app.use('/api/token', token);

// Route for serving index.html for all other routes (SPA fallback)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT; // Get port from environment variable
// Start listening on specified port
app.listen(PORT, async () => {
    const { default: open } = await import('open'); // Import 'open' module to open default browser
    open(`http://localhost:${PORT}`); // Open browser to localhost on specified port
    console.log(`Server is running on http://localhost:${PORT}`); // Log server start message
});
