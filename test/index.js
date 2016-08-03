/* eslint-env mocha */

var expect = require('chai').expect
var nock = require('nock')
var processon = require('../index')

describe('Client constructor', function () {
  it('should ok if access_token from string', function () {
    var client = new processon.Client('access_token')
    expect(client).be.instanceof(processon.Client)
  })

  it('should ok if access_token from object', function () {
    var client = new processon.Client({
      access_token: 'access_token'
    })
    expect(client).be.instanceof(processon.Client)
  })

  it('should throw if access_token missed', function () {
    function createClient () {
      var client = new processon.Client()
      return client
    }
    expect(createClient).to.throw(Error)
  })

  it('should throw if access_token missed', function () {
    function createClient () {
      var client = new processon.Client({})
      return client
    }
    expect(createClient).to.throw(Error)
  })
})

describe('Client APIs', function () {
  var client = new processon.Client('a valid access_token')

  after(function () {
    nock.cleanAll()
  })

  it('user info', function (done) {
    nock('http://open.processon.com')
      .get(/\/api\/user.*/)
      .reply(200, require('./fixtures/user'))

    client.getUser(function (err, result) {
      expect(err).to.be.null
      expect(result.status).to.be.equal('success')
      expect(result.data).to.include.keys(['_id', 'userName', 'email', 'profileUrl'])
      done()
    })
  })

  it('get user diagrams', function (done) {
    nock('http://open.processon.com')
      .get(/\/api\/diagrams.*/)
      .reply(200, require('./fixtures/diagrams'))

    client.getDiagrams(function (err, result) {
      expect(err).to.be.null
      expect(result.status).to.be.equal('success')
      done()
    })
  })

  it('get user recent diagrams', function (done) {
    nock('http://open.processon.com')
      .get(/\/api\/diagrams.*/)
      .reply(200, require('./fixtures/diagrams'))

    client.getRecentDiagrams(function (err, result) {
      expect(err).to.be.null
      expect(result.status).to.be.equal('success')
      done()
    })
  })

  it('get user clloa diagrams', function (done) {
    nock('http://open.processon.com')
      .get(/\/api\/diagrams.*/)
      .reply(200, require('./fixtures/diagrams'))

    client.getCollaDiagrams(function (err, result) {
      expect(err).to.be.null
      expect(result.status).to.be.equal('success')
      done()
    })
  })
})

describe('client APIs with invalid access_token', function () {
  var client = new processon.Client('invalid access_token')

  beforeEach(function () {
    nock('http://open.processon.com')
      .get(/\/api.*/)
      .reply(200, require('./fixtures/error3001'))
  })

  after(function () {
    nock.cleanAll()
  })

  it('should fail when request user info', function (done) {
    client.getUser(function (err, result) {
      expect(err).to.not.be.null
      done()
    })
  })

  it('should fail when request user diagrams', function (done) {
    client.getDiagrams(function (err, result) {
      expect(err).to.not.be.null
      done()
    })
  })

  it('should fail when request user recent diagrams', function (done) {
    client.getRecentDiagrams(function (err, result) {
      expect(err).to.not.be.null
      done()
    })
  })

  it('should fail when request user colla diagrams', function (done) {
    client.getCollaDiagrams(function (err, result) {
      expect(err).to.not.be.null
      done()
    })
  })
})
