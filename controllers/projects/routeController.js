const express = require('express');
const router = express.Router();
const viewController = require('./viewController.js');
const dataController = require('./dataController.js');
const authDataController = require('../auth/dataController.js');

// Index 
router.get(
  '/',
  authDataController.auth,
  dataController.getAllProjects,
  viewController.index
);

// New   
router.get(
  '/new',
  authDataController.auth,
  viewController.newView
);

// Create 
router.post(
  '/',
  authDataController.auth,
  dataController.createProject,
  viewController.redirectHome
);

// Show 
router.get(
  '/:id',
  authDataController.auth,
  dataController.getProjectById,
  viewController.show
);

// Edit 
router.get(
  '/:id/edit',
  authDataController.auth,
  dataController.getProjectById,
  viewController.edit
);

// Update 
router.put(
  '/:id',
  authDataController.auth,
  dataController.updateProject,
  viewController.redirectShow
);

// Delete
router.delete(
  '/:id',
  authDataController.auth,
  dataController.deleteProject,
  viewController.redirectHome
);

module.exports = router;
