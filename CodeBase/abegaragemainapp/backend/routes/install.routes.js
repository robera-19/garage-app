const express = require('express');
const router = express.Router();
const installController = require('../controllers/install.controller');

// Route to handle installation
router.get('/install', installController.install);

module.exports = router;