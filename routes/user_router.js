const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/auth_controller');
const userController = require('../controllers/user_controller');

router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
], authController.userLogin);

router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
], authController.userRegistration);

router.get('/logout', authController.userLogout);

router.get('/me',
    authController.authBearerToken
    , authController.userDetails);

router.post('/profile', [
    authController.authBearerToken
], userController.updateUserProfile);

router.get('/nearby', [
    body('lat').exists(),
    body('long').exists(),
    authController.authBearerToken
], userController.findNearbyUsers);

router.get('/nearby-friends', [
    body('lat').exists(),
    body('long').exists(),
    authController.authBearerToken
], userController.findNearbyFriends);


module.exports = router;
