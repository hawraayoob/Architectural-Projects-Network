const express = require('express')
const morgan = require('morgan')
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')

//   routeControllers
const userRoutes = require('./controllers/auth/routeController')
const projectRoutes = require('./controllers/projects/routeController')
const commentRoutes = require('./controllers/comments/routeController')

// to test
const apiRoutes = require('./routes/apiRoutes')

const app = express()

//  to show views
app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

// Middleware
app.use(express.json()) //  
app.use(express.urlencoded({ extended: true })) 
app.use(methodOverride('_method')) 
app.use(express.static('public'))  
app.use(morgan('dev'))   

// view
app.use((req, res, next) => {
  res.locals.data = {}
  next()
})

// connected router
app.use('/users', userRoutes)
app.use('/projects', projectRoutes)
app.use('/comments', commentRoutes)
app.use('/api', apiRoutes) 

module.exports = app


