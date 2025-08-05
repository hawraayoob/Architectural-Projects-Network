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

// Show form to create new comment
router.get(
  '/new',
  authDataController.auth,
  viewController.newView
);

// Create a new comment
router.post(
  '/',
  authDataController.auth,
  dataController.createComment,
  viewController.redirectHome
);

// Show a single comment by id
router.get(
  '/:id',
  authDataController.auth,
  dataController.getCommentById,
  viewController.show
);

// Show edit form for comment
router.get(
  '/:id/edit',
  authDataController.auth,
  dataController.getCommentById,
  viewController.edit
);

// Update a comment
router.put(
  '/:id',
  authDataController.auth,
  dataController.updateComment,
  viewController.redirectShow
);

// Delete a comment
router.delete(
  '/:id',
  authDataController.auth,
  dataController.deleteComment,
  viewController.redirectHome
);



module.exports = router;
