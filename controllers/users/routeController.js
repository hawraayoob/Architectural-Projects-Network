const express = require('express');
const router = express.Router();
const viewController = require('./viewController.js');
const dataController = require('./dataController.js');
const authDataController = require('../auth/dataController.js');

// Index - USER
router.get(
  '/',
  authDataController.auth,
  dataController.getAllUsers,
  viewController.index
);

// New - User
router.get(
  '/new',
  viewController.newView
);

// Create - USER
router.post(
  '/',
  dataController.createUser,
  viewController.redirectHome
);

// Show -    USER
router.get(
  '/:id',
  authDataController.auth,
  dataController.getUserById,
  viewController.show
);

// Edit - USER
router.get(
  '/:id/edit',
  authDataController.auth,
  dataController.getUserById,
  viewController.edit
);

// Update USER
router.put(
  '/:id',
  authDataController.auth,
  dataController.updateUser,
  viewController.redirectShow
);

// Delete - USER
router.delete(
  '/:id',
  authDataController.auth,
  dataController.deleteUser,
  viewController.redirectHome
);

module.exports = router;
