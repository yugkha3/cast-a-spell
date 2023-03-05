const express = require('express');

const auth = require('../middleware/auth');
const uploadController = require('../controllers/upload.controller.js');

const uploadRouter = express.Router();
uploadRouter.post('/upload', auth, uploadController.uploadImages);

module.exports = uploadRouter;