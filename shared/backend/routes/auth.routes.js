const router = require('express').Router();
const { signup, login } = require('../controllers/auth.controller');
const { validateSignup, validateLogin } = require('../middleware/validation.middleware');

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

module.exports = router;
