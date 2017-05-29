var features = []

function Feature (configFeatures) {
  features = configFeatures
}

exports.getAllFeatures = function () {
  return features
}

exports.getFeature = function (id) {
  return features.filter(function (feature) {
    return feature.id === id
  })
}

exports.toggleFeature = function (id, enabled) {
  features.forEach(function (feature) {
    if (feature.id === id) {
      feature.enabled = (enabled === 'true')
    }
  })
  return features
}

exports.toggleFeatures = function (featuresToUpdate) {
  featuresToUpdate.forEach(function (featureToUpdate) {
    features.forEach(function (feature) {
      if (feature.id === featureToUpdate.id) {
        feature.enabled = (featureToUpdate.enabled === 'true')
      }
    })
  })
  return features
}

exports.Feature = Feature
