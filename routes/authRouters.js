const { Router } = require('express')
const router = Router()
const authControllers = require('../controllers/authControllers.js')
const VerifyToken = require( './middleware/authUser')

//Register 
router.post('/login', authControllers.Login)

router.get('/contacts', authControllers.GetContacts)

router.post('/messages', authControllers.GetMessaages)

router.post('/latest-message', authControllers.GetLatestMessage)

router.post('/read-messages', authControllers.ReadMessages)


router.post('/set-status', authControllers.SetStatus)


router.get('/user-auth', VerifyToken , authControllers.IsUserAuth)


//router.post('/saveMessage', authControllers.SaveMessage)

module.exports = router;