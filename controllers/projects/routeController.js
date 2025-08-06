const express = require('express');
const router = express.Router();
const viewController = require('./viewController.js');
const dataController = require('./dataController.js');
const authDataController = require('../auth/dataController.js');

// Add multer for img upload
const multer = require('multer');
const path = require('path');

//  Configure storage for uploaded imgs
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save and uploads folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });


//ROUTES

/// Index
router.get(
  '/',
  authDataController.auth,
  dataController.getAllProjects,
  viewController.index
);

/// New   
router.get(
  '/new',
  authDataController.auth,
  viewController.newView
);

///  Create with img
router.post(
  '/',
  authDataController.auth,
  upload.single('image'), 
  dataController.createProject,
  viewController.redirectHome
);

/// Show
router.get(
  '/:id',
  authDataController.auth,
  dataController.getProjectById,
  viewController.show
);

/// Edit
router.get(
  '/:id/edit',
  authDataController.auth,
  dataController.getProjectById,
  viewController.edit
);

/// Update
router.put(
  '/:id',
  authDataController.auth,
  upload.single('image'), 
  dataController.updateProject,
  viewController.redirectShow
);

/// Delete
router.delete(
  '/:id',
  authDataController.auth,
  dataController.deleteProject,
  viewController.redirectHome
);

router.get(
  '/profile',
  authDataController.auth,
  viewController.showProfile
);


module.exports = router;
