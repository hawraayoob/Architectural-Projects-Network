const User = require('../../models/user')

// API User controllers - returns JSON responses
const apiController = {
  // Get all users for authenticated user
  index(req, res) {
    res.json(res.locals.data.users)
  },

  // Get single user
  show(req, res) {
    res.json(res.locals.data.user)
  },

  // Create new user
  create(req, res) {
    res.status(201).json(res.locals.data.user)
  },

  // Delete users
  destroy(req, res) {
    res.status(200).json({ message: 'User successfully deleted' })
  }
}


module.exports = apiController 

