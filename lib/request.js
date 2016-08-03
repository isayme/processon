var request = require('request').defaults({
  baseUrl: 'http://open.processon.com/api/',
  method: 'GET',
  gzip: true,
  json: true
})

var responseHandler = function (callback) {
  var hanlder = function (err, res, body) {
    if (err) {
      return callback(err)
    }
    if (body.status !== 'success') {
      err = new Error(body.error_message)
      err.code = body.error_code
      return callback(err)
    }
    return callback(null, body)
  }

  return hanlder
}

module.exports = {
  request: request,
  responseHandler: responseHandler
}
