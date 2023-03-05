const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next) => {
    try {
        const cookie_token = req.cookies.token
        if(!cookie_token) return res.status(401).json({errorMessage: 'Unauthorized'});
        const verified = jwt.verify(cookie_token, process.env.JWT_SECRET)
        req.user = verified.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({errorMessage: 'Unauthorized'});
    }
}

module.exports = auth