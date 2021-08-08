const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRouters')
const cookieParser = require('cookie-parser')
const app = express();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const port = 3000
const MessageModel = require('./models/msg')
const session = require('express-session')
const mongoUri = 'mongodb://localhost:27017/zeus'

// middleware
app.use(express.static('public'));

app.use(express.json())
app.use(cookieParser())
app.use(session({ secret: '123321', cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }}))
// view engine
app.set('view engine', 'ejs');

io.on('connection', socket=> {
    console.log('socket' + '  ' + socket.id)
    socket.on('private message', msg => {
        console.log(msg)
        io.emit(`private message${msg.from}${msg.to}`, msg);
        io.emit(`private message${msg.to}${msg.from}`, msg);
        const { message, from, to, date } = msg;
        const contacts = [ from, to]
        const newMessage = new MessageModel({ message, from, to, date, contacts}).save(()=> {console.log('saved')})
    })
})


// database connection
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
 /*   .then((result) => app.listen(port, () => console.log('connected')))
    .catch((err) => console.log(err));*/

    server.listen(port, ()=> {`port connected on ${port}`})

// routes
app.use(authRoutes);

