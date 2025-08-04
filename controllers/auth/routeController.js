const express = require('express');
const router = express.Router();
const viewController = require('./viewController.js');
const dataController = require('./dataController.js');


router.get('/', (req, res) => {
  res.send('User index route works!')
})

// create user
router.post('/signup', dataController.createUser, (req, res) => {
//redirect
  if (viewController.redirectHome && typeof viewController.redirectHome === 'function') {
    return viewController.redirectHome(req, res);
  }
  // send response
  res.status(201).json(res.locals.data || { message: 'User created' });
});

module.exports = router;



