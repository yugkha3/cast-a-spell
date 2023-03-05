const express = require('express')
const cors = require('cors');
require('dotenv').config()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const uploadRouter = require('./routes/upload.router.js');
const generateRouter = require('./routes/generate.router.js');
const { googleOAuth } = require('./controllers/oauth.controller.js');
const { isLoggedIn, logOut } = require('./controllers/session.controller.js');

const app = express();
app.use(cors({
    origin: [process.env.BASE_URL_CLIENT],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const PORT = 5000

app.post('/generate', generateRouter);
app.post('/upload', uploadRouter);
app.get('/oauth/google', googleOAuth);
app.get('/loggedin', isLoggedIn)
app.get('/logout', logOut);


app.listen(PORT, () => {
    console.log('Server up and running.');
    const db = process.env.MONGO
    mongoose.set('strictQuery', false);
    mongoose.connect(db).then(() => {
        console.log(`Database Connected.`)
    }).catch((err) => {
        console.log(err)
    })
})