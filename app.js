// BASE SETUP
// =============================================================================

// Call the packages we need
var express = require('express')        // call express
var app = express()                 // define our app using express
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

// add routing for static assets if running as a standalone server
app.use('/public', express.static(path.resolve(__dirname, './public')))
app.use((req, res, next) => {
  res.locals.assetPath = '/public'
  next()
})

require('hmpo-govuk-template').setup(app)
app.set('view engine', 'html')
app.engine('html', require('hogan-express-strict'))
app.set('views', path.resolve(__dirname, './views'))
app.use(require('express-partial-templates')(app))

// SETUP OUR FEATURES
// =============================================================================

var config = require('config')
var featureModel = require('./models/feature')
featureModel.Feature(config.get('features'))

// ROUTES
// =============================================================================

app.use('/api/feature', require('./routes/api/feature'))
app.use(require('./routes'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
})

// error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
        message: err.message,
        error: {}
    })
})

module.exports = app
