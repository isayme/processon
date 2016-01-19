var expect = require('chai').expect;
var processon = require('../index');

var access_token = process.env.PROCESSON_ACCESS_TOKEN;

describe('Client constructor', function() {
  it('should ok if access_token from string', function() {
    var c = new processon.Client('access_token');
  });

  it('should ok if access_token from object', function() {
    var c = new processon.Client({
      access_token: 'access_token'
    });
  });

  it('should throw if access_token missed', function() {
    function createClient() {
      var c = new processon.Client();
    }
    expect(createClient).to.throw(Error);
  });

  it('should throw if access_token missed', function() {
    function createClient() {
      var c = new processon.Client({});
    }
    expect(createClient).to.throw(Error);
  });
});

describe('Client APIs', function() {
  var client = null;

  this.timeout(0);

  it('process.env.PROCESSON_ACCESS_TOKEN should set for test', function() {
    expect(access_token).to.be.a('string');

    client = new processon.Client({
      access_token: access_token
    });
  });

  it('user info', function(done) {
    client.getUser(function(err, result) {
      expect(err).to.be.null;
      expect(result.status).to.be.equal('success');
      expect(result.data).to.include.keys(['_id', 'userName', 'email', 'profileUrl']);
      done();
    });
  });

  it('get user diagrams', function(done) {
    client.getDiagrams(function(err, result) {
      expect(err).to.be.null;
      expect(result.status).to.be.equal('success');
      expect(result.data).to.be.a('array');
      done();
    });
  });

  it('get user recent diagrams', function(done) {
    client.getRecentDiagrams(function(err, result) {
      expect(err).to.be.null;
      expect(result.status).to.be.equal('success');
      expect(result.data).to.be.a('array');
      done();
    });
  });

  it('get user clloa diagrams', function(done) {
    client.getCollaDiagrams(function(err, result) {
      expect(err).to.be.null;
      expect(result.status).to.be.equal('success');
      // expect(result.data).to.be.a('array');
      done();
    });
  });
});
