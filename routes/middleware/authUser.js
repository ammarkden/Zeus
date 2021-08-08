const jwt = require('jsonwebtoken')
const VerifyToken = async (req, res, next) => {
    try {
        const token = await req.cookies.jwt;
        if (!token) {
            res.json('An error occured!')
        } else {
            jwt.verify(token, 'token321', (err, decoded) => {
                if (err) {
                    res.json({ auth: false, })
                    console.log('auth error')
                } else {
                    req.userId = decoded.id;
                    next()
                }
            })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports = VerifyToken