const jwt = require('jsonwebtoken')
const { User } = require('../models/user.model.js')

async function isLoggedIn(req, res) {
    try {
        const token = req.cookies.token
        if(!token) return res.json({isVerified: false});
        
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified.user

        const user = await User.findById(req.user);        
        res.json({name: user.name, email: user.email, picture: user.picture, isVerified: true, images: user.images, username: user.username, isTrained: user.isTrained})
    } catch (error) {
        console.log(error)
        res.json({name: '', email: '', picture: '', isVerified: false, images: []})
    }
}

function logOut(req, res) {
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
        origin: process.env.BASE_URL_CLIENT,
        sameSite: "none",
        secure: true
    }).send()
}

module.exports = {
    isLoggedIn,
    logOut
}