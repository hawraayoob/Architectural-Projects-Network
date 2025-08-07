const express = require('express');
const router = express.Router();

const dataController = require('./dataController.js');
const viewController = require('./viewController.js');

// Show Sign Up form
router.get('/signup', viewController.signUp);

// Show Login form
router.get('/login', viewController.signIn);

// Create new user to go to profile
router.post(
  '/',
  dataController.createUser,
  viewController.redirectToProfile
);

router.post(
  '/signup',
  dataController.createUser,
  viewController.redirectToProfile
);

// Login user 
router.post(
  '/login',
  dataController.loginUser,
  viewController.redirectToProfile
);

// Show profile
router.get(
  '/profile',
  dataController.auth,
  viewController.profile
);

// to get signin pg
router.get('/SignIn', viewController.signIn)



module.exports = router;