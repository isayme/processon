var expect = require('chai').expect;
var processon = require('../index');

var access_token = process.env.PROCESSON_ACCESS_TOKEN;

var client = new processon.Client({
  access_token: access_token
});

describe('Client', function() {
  this.timeout(5000);

  it('process.env.PROCESSON_ACCESS_TOKEN should set for test', function() {
    expect(access_token).to.be.a('string');
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
      expect(result.data).to.be.a('array');
      done();
    });
  });
});
