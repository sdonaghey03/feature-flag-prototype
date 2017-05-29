var express = require('express')
var router = express.Router()
var featureModel = require('../../models/feature')
var dates = require('../../lib/dates')

// GET: All features
// Returns: JSON array of features
router.get('/list', function (req, res) {
  var featureList = featureModel.getAllFeatures()
  res = sendCookieHeader(res, featureList)
  res.json(featureList)
})

// POST: Set enabled flag by array of JSON objects
// Expected JSON format:
// [
//      {
//          "id":"feature-1",
//          "enabled":"true"
//      },
//      {
//          "id":"feature-2",
//          "enabled":"false"
//      }
// ]
// Returns: Updated feature JSON array
router.post('/toggle', function (req, res) {
  var featureList = featureModel.toggleFeatures(req.body)
  res = sendCookieHeader(res, featureList)
  res.json(featureList)
})

// GET: Specific feature by ID
// Returns: Feature JSON object
router.get('/:id/detail', function (req, res) {
  res.json(featureModel.getFeature(req.params.id))
})

// POST: Set enabled flag by ID
// Returns: Updated feature JSON array
router.post('/:id/toggle', function (req, res) {
  var featureList = featureModel.toggleFeature(req.params.id, req.body.enabled)
  res = sendCookieHeader(res, featureList)
  res.json(featureList)
})

function sendCookieHeader (res, featureList) {
  res.set('set-cookie', 'this-cookie=' + JSON.stringify(featureList) + '; expires=' + dates.getCookieExpiryDate() + '')
  return res
}

module.exports = router
