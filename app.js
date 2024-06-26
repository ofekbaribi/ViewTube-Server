const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const initializeDatabase = require('./utils/initializeDatabase');

require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to MongoDB');
    initializeDatabase().catch(console.error);
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});;



app.use(express.static('public'));
app.use('/media', express.static('public/media'));

const videos = require('./routes/videosRoutes');
app.use('/videos', videos);

app.listen(process.env.PORT);