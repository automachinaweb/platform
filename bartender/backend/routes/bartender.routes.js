const express = require('express');
const router = express.Router();
const bartenderController = require('../controllers/bartender.controller');

router.get('/bartenders', bartenderController.getAllBartenders);
router.get('/bartenders/:id', bartenderController.getBartenderById);


module.exports = router;
