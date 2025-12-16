const express = require('express');
const router = express.Router();
const bartenderController = require('../controllers/bartender.controller');

router.get('/', bartenderController.getBartenders);
router.get('/:id', bartenderController.getBartenderById);

module.exports = router;
