const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/refreshToken', userController.refreshToken);
router.patch('/edit/:userId', authMiddleware, userController.editUser);
// router.get(
//   '/sendPassword/:userId',
//   authMiddleware,
//   userController.sendPassword
// );
// router.patch('/resetPassword');

module.exports = router;
