const express = require('express');
const router = express.Router();

// Import controllers - TO MATCH STRUCTURE
const userApiController = require('../controllers/auth/apiController');
const projectDataController = require('../controllers/projects/dataController');
const projectApiController = require('../controllers/projects/apiController');
const commentDataController = require('../controllers/comments/dataController');
const commentApiController = require('../controllers/comments/apiController');

// to ensure valid functions
console.log('userApiController.auth:', typeof userApiController.auth);
console.log('projectDataController.index:', typeof projectDataController.index);
console.log('projectApiController.index:', typeof projectApiController.index);
console.log('commentDataController.index:', typeof commentDataController.index);
console.log('commentApiController.index:', typeof commentApiController.index);

//  Users 
router.post('/users', userApiController.createUser);
router.post('/users/login', userApiController.loginUser);
router.get('/users/profile', userApiController.auth, userApiController.getProfile);
router.put('/users/:id', userApiController.auth, userApiController.updateUser);
router.delete('/users/:id', userApiController.auth, userApiController.deleteUser);

//  Projects 
router.get(
  '/projects',
  userApiController.auth,
  projectDataController.index,
  projectApiController.index
);
router.get(
  '/projects/:id',
  userApiController.auth,
  projectDataController.getProjectById || projectDataController.show,
  projectApiController.getProjectById || projectApiController.show
);
router.post(
  '/projects',
  userApiController.auth,
  projectDataController.createProject,
  projectApiController.createProject || projectApiController.create
);
router.put(
  '/projects/:id',
  userApiController.auth,
  projectDataController.updateProject,
  projectApiController.updateProject || projectApiController.update
);
router.delete(
  '/projects/:id',
  userApiController.auth,
  projectDataController.deleteProject,
  projectApiController.deleteProject || projectApiController.destroy
);

//  Comments 
router.get(
  '/comments',
  userApiController.auth,
  commentDataController.getAllComments || commentDataController.index,
  commentApiController.getCommentsForProject
);
router.get(
  '/comments/:id',
  userApiController.auth,
  commentDataController.getCommentById 
  // commentApiController.show
);
router.post(
  '/comments',
  userApiController.auth,
  commentDataController.createComment 
  // commentApiController.create
);
router.put(
  '/comments/:id',
  userApiController.auth,
  commentDataController.updateComment 
  // commentApiController.update
);
router.delete(
  '/comments/:id',
  userApiController.auth,
  commentDataController.deleteComment
  // commentApiController.destroy
);

module.exports = router;


