const express = require('express');

const auth = require('../middleware/auth');
const generateController = require('../controllers/generate.controller.js')

const generateRouter = express.Router();
generateRouter.post('/generate', auth, generateController.generateImage)

module.exports = generateRouter;