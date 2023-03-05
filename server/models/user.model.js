const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    picture: {type: String},
    password: {type: String, required: true},
    images: {type: Array},
    isTrained: {type: Boolean, default: false},
    username: {type: String, required: true, unique: true}
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

const findAndUpdateUser = async (query, update, options) => {
    return User.findOneAndUpdate(query, update, options)
}

module.exports = {
    findAndUpdateUser,
    User
}