const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String,
        required: true
    },
},);

module.exports = mongoose.model('User', userSchema);
