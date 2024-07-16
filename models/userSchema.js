const mongoose = require('mongoose');
const { Schema } = mongoose; // Create a reference to the Schema constructor

// Define the User schema
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
