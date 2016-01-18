var request = require('request').defaults({
  baseUrl: 'http://open.processon.com/api/',
  method: 'GET',
  gzip: true,
  json: true
});

function Client(options) {
  if (typeof options === 'string') {
    options = {
      access_token: options
    };
  }
  this.access_token = options.access_token;
  if (!this.access_token) {
    throw new Error('access_token required');
  }
}

Client.prototype.getUser = function(callback) {
  var options = {
    uri: '/user',
    qs: {
      access_token: this.access_token
    }
  };

  request(options, function(err, res, body) {
    return callback(err, body);
  });
};


Client.prototype.getDiagrams = function(params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  var options = {
    uri: '/diagrams',
    qs: {
      access_token: this.access_token,
      chart_title: params.chart_title,
      teamid: params.teamid,
      page_size: params.page_size,
      cur_page: params.cur_page,
      status: params.status
    }
  };

  request(options, function(err, res, body) {
    return callback(err, body);
  });
};

Client.prototype.getRecentDiagrams = function(params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  var options = {
    uri: '/diagrams/recent',
    qs: {
      access_token: this.access_token,
      count: params.count
    }
  };

  request(options, function(err, res, body) {
    return callback(err, body);
  });
};

Client.prototype.getCollaDiagrams = function(params, callback) {
  if (typeof params === 'function') {
    callback = params;
    params = {};
  }

  var options = {
    uri: '/diagrams/colla',
    qs: {
      access_token: this.access_token,
      page_size: params.page_size,
      cur_page: params.cur_page
    }
  };

  request(options, function(err, res, body) {
    return callback(err, body);
  });
};

module.exports = Client;
