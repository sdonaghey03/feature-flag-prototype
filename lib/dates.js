exports.getCookieExpiryDate = function () {
  var date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toGMTString()
}
