const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { validateSignup, validateLogin } = require('../middleware/validate.middleware');

router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);


module.exports = router;