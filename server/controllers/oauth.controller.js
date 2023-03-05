require('dotenv').config()
const jwt = require('jsonwebtoken')
const { findAndUpdateUser } = require('../models/user.model.js')
const qs = require('querystring')
const fetch = require("node-fetch-commonjs")


async function googleOAuth(req, res) {
    const code = req.query.code
    const url = 'https://oauth2.googleapis.com/token'
    const values = {
        code,
        client_id: process.env.GOOGLE_OAUTH_CLIENT,
        client_secret: process.env.GOOGLE_OAUTH_SECRET,
        redirect_uri: `${process.env.BASE_URL_SERVER}/oauth/google`,
        grant_type: 'authorization_code',
    };
    try {
        let tokens = await fetch(
            url,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                method: 'POST',
                body: qs.stringify(values)
            }
        );
        
        tokens = await tokens.json();
        const id_token = tokens.id_token;
        const userData = jwt.decode(id_token);
        if(!userData.email_verified) {
            return res.status(403).send('Google Account is not verified.')
        }

        const user = await findAndUpdateUser(
            {
                email: userData.email
            }, 
            {
                email: userData.email,
                name: userData.name,
                picture: userData.picture,
                username: userData.email.substring(0, userData.email.indexOf('@'))
            }, 
            {
                upsert: true,
                new: true
            }
        )
        const cookie_token = jwt.sign({
            user: user._id
        }, process.env.JWT_SECRET)

        res.cookie('token', cookie_token, {
            httpOnly: true,
            origin: process.env.BASE_URL_CLIENT,
            sameSite: "none",
            secure: true
        });
        res.redirect(`${process.env.BASE_URL_CLIENT}`);
        // res.status(200).send();
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    googleOAuth
};