const mongoose = require('mongoose');
const { Schema } = mongoose

const msgSchema = new Schema({
    message: {
        type: String,
    },
    date: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    contacts: {
        type: Array
    },
    isSeen: {
        type: Boolean, 
        default: false
    }

})


const Message = mongoose.model('msg', msgSchema)

module.exports = Message