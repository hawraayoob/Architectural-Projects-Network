const express = require('express');
const router = express.Router();

const authDataController = require('../auth/dataController.js');
const dataController = require('./dataController.js');
const viewController = require('./viewController.js');

const RESOURCE_PATH = '/comments';

// Show all comments
router.get(
  '/',
  authDataController.auth,
  dataController.getAllComments,
  viewController.index
);

//to show create proj form
router.get(
  '/new/:projectId',
  authDataController.auth,
  viewController.newView
);

// Create a new comment
router.post(
  '/',
  authDataController.auth,
  dataController.createComment,
  viewController.redirectToProject
);

// Show by id
router.get(
  '/:id',
  authDataController.auth,
  dataController.getCommentById,
  viewController.show
);

//  edit comment
router.get(
  '/:id/edit',
  authDataController.auth,
  dataController.getCommentById,
  viewController.edit
);

// Update  comment
router.put(
  '/:id',
  authDataController.auth,
  dataController.updateComment,
  viewController.redirectToProject
);

// Delete  comment
router.delete(
  '/:id',
  authDataController.auth,
  dataController.deleteComment,
  viewController.redirectToProject
);

module.exports = router;