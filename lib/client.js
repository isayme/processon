var request = require('request').defaults({
  method: 'GET',
  gzip: true,
  json: true
});

function Client(options) {
  this.access_token = options.access_token;
}

Client.prototype.getUser = function(callback) {
  var options = {
    url: 'http://open.processon.com/api/user',
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
    url: 'http://open.processon.com/api/diagrams',
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
    url: 'http://open.processon.com/api/diagrams/recent',
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
    url: 'http://open.processon.com/api/diagrams/colla',
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
