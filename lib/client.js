var request = require('./request').request;
var responseHandler = require('./request').responseHandler;

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

  request(options, responseHandler(callback));
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

  request(options, responseHandler(callback));
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

  request(options, responseHandler(callback));
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

  request(options, responseHandler(callback));
};

module.exports = Client;
