const express = require('express');
const authConroller = require('../Controllers/authController');
const userController = require('../Controllers/userController');

const router = express.Router();

router.post('/signup', authConroller.signup);
router.post('/login', authConroller.login);
router.get('/logout', authConroller.logout);

router.post('/forgotPassword', authConroller.forgotPassword);
router.patch('/resetPassword/:token', authConroller.resetPassword);

router.get('/:id', userController.getUser);

router.patch('/updateMyPassword', authConroller.updatePassword);

router.patch(
  '/uploadprofilephoto',
  authConroller.protect,
  userController.uploadPhoto,
  userController.resizeUserPost,
  userController.uploadProfilePhoto
);


module.exports = router;
