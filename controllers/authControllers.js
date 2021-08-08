const User = require('../models/User');
const jwt = require('jsonwebtoken')
const Messages = require('../models/msg')
var session = require('express-session')
const maxAge = 3 * 24 * 60 * 60;
const createToken = id => {
    return jwt.sign({ id }, 'token321', {
        expiresIn: maxAge,
    })
}


module.exports.Login = async (req, res) => {
    try {
        const { email, password } = await req.body;
        const user = await User.findOne(({ email, password }))
        if (user) {
            const token = createToken(user._id)
            session = req.session;
           session.userId = user._id;
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
            res.json({ auth: true, id: user._id, user: user, token: token })
        } else {
            res.json({ auth: false, msg: 'Email/Password not valid' })
        }
    } catch (err) {
        console.log('true')
        console.log(err)
    }

}

module.exports.IsUserAuth = async (req, res) => {
    session = req.session;
    if (session.userId) {
        const user = await User.findOne({ _id: session.userId })
        res.json({ auth: true, user: user })
    } else {
        return false
    }
}

module.exports.GetContacts = async (req, res) => {
    session = req.session;
    if (session.userId) {
        const contacts = await User.find({ _id: { $ne: session.userId } })
        res.json(contacts)
    } else { return false }

}
//from: id, to: userId
module.exports.GetMessaages = async (req, res) => {
    try {
        const { id, userId } = await req.body
        console.log('id' + id)
        const contacts = [userId, id]
        const messages = await Messages.find({ contacts: { $all: contacts } })
        console.log(messages)
        console.log(userId + '   ' + id + 'bbbbbbb')
        res.json({ messages })
    } catch(err) {
        console.log(err)
    }

}

module.exports.GetLatestMessage = async (req, res) => {
    try {
        const {  userId } = await req.body
        console.log(userId)
        const m3 = await Messages.find({ contacts: { $ne: userId } });
        const contacts = [userId, m3]
        const messages = await Messages.find({ contacts: { $all: contacts } }).sort([['_id', -1]])
        console.log(messages)
        res.json({ messages })
    } catch(err) {
        console.log(err)
    }

}


module.exports.ReadMessages = async (req,res)=> {

    try {
        const { id, userId } = await req.body
        console.log('id' + id)
        const contacts = [userId, id]
        const query = {
            isSeen: false
        }
        const messages = await Messages.find({ contacts: { $all: contacts } }).updateMany(query, {$set: {isSeen:true}})
        console.log(messages)
        console.log(userId + '   ' + id + 'bbbbbbb')
        res.json({ messages })
    } catch(err) {
        console.log(err)
    }

}



module.exports.SetStatus = async (req,res)=> {
    try {
        const { id } = await req.body; 
        const status = User.findOne({ id });
        if(status.isOnline) {
             const status = await User.updateOne({ id }, $set({isOnline: false}));
             res.json(status)
        } else {
            const status = await User.updateOne({ id }, $set({isOnline: true}));
            res.json(status)
        }

    } catch(err) {
        console.log(err)
    }
}
/*
module.exports.SaveMessage = async (req,res)=> {
    const { msg, date, from, to  } = await req.body;
    //post or save
}*/