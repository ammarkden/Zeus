const mongoose = require('mongoose');
const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    }, 
    password: {
        type: String,
        minlength: 6,
    },
    phoneNumber: {
        type: Number
    },
    profilePicture: {
    type: String,
    },
    chatWallpaper: {
        type: String, 
        default: 'https://images.unsplash.com/photo-1557683325-3ba8f0df79de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80',
    },
    isOnline: {
        type: Boolean, 
        default: false
    }

}) 


const User = mongoose.model('user', userSchema)

module.exports = User