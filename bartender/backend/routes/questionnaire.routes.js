const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.middleware');
const { submitQuestionnaire, getQuestionnaire } = require('../controllers/questionnaire.controller');

// Route to submit questionnaire answers
router.post('/submit',  authenticateToken, submitQuestionnaire);
router.get('/', authenticateToken, getQuestionnaire);

module.exports = router;
