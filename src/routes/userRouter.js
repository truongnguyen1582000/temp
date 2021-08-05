const { randomBytes } = require('crypto');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/refreshToken', userController.refreshToken);

module.exports = router;
