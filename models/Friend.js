const mongoose = require('mongoose');
const { Schema } = mongoose

const friendSchema = new Schema({
    user: {
        type: String
    },
    friend: {
        type: String, 
    },
    status: {
        type: String, // not yet, pending and friend
    }, 
    date: {
        type: String
    }

}) 


const Friend = mongoose.model('friend', friendSchema)

module.exports = Friend