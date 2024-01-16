const express = require('express');

const authController = require('./../controllers/authController');
const programController = require('./../controllers/programController');

const router = express.Router();

// route to log the user in
router.post('/login', authController.login);

// route to signup the user
router.post('/signup', authController.signup);

// route to get all user's programs
router.get(
  '/myPrograms',
  authController.protect,
  programController.getMyPrograms
);

// route to update the user password
router.post(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);

module.exports = router;
