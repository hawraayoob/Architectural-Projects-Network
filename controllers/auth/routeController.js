const express = require('express');
const router = express.Router();

const viewController = require('./viewController.js');
const dataController = require('./dataController.js');
const projectViewController = require('../projects/viewController.js');

// ===== View Routes =====

// Show signup form
router.get('/', viewController.signUp);             // GET /users
router.get('/signup', viewController.signUp);       // GET /users/signup (alias)

// Show login form
router.get('/login', viewController.signIn);        // GET /users/login
router.get('/signin', viewController.signIn);       // GET /users/signin (alias)

// ===== Data Routes =====

// Create new user
router.post('/', dataController.createUser, viewController.redirectToLogin); // POST /users
// You can optionally add this alias too:
router.post('/signup', dataController.createUser, viewController.redirectToLogin); // POST /users/signup

// Login user
router.post('/login', dataController.loginUser, projectViewController.redirectHome);

// Update user by ID
router.put('/:id', dataController.updateUser);

// Delete user by ID (auth protected)
router.delete('/:id', dataController.auth, dataController.deleteUser);




module.exports = router;
