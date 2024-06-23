const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const videos = require('./routes/videoRoutes');

require('custom-env').env(process.env.NODE_ENV, './config');
mongoose.connect(process.env.CONNECTION_STRING,
                { useNewUrlParser: true,
                useUnifiedTopology: true });

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.json());

app.use('/video', videos);

app.listen(process.env.PORT);