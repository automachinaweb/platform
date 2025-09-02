const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateBartenderProfile } = require('../middleware/bartender.validation');

// Basic auth routes
router.post('/login', authController.login);
router.post('/signup', validateBartenderProfile, authController.signup);

module.exports = router;
