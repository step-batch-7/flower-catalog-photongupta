const {app} = require('../lib/handler');
const request = require('supertest');
const {stringify} = require('querystring');

describe('GET /', function() {
  it('test  for get request with file path /', function(done) {
    request(app.serve.bind(app))
      .get('/')
      .set('Accept', '*/*')
      .expect('Content-Type', 'text/html')
      .expect('Content-Length', '940')
      .expect(200, done);
  });
});

describe('GET /guestBook.html', function() {
  it('test  for get request with file path /guestBook.html', function(done) {
    request(app.serve.bind(app))
      .get('/guestBook.html')
      .set('Accept', '*/*')
      .expect('Content-Type', 'text/html')
      .expect(200, done);
  });
});

describe('GET /bad', function() {
  it('test  for post request with file not existing', function(done) {
    request(app.serve.bind(app))
      .get('/bad')
      .set('Accept', '*/*')
      .expect(404, done);
  });
});

describe('POST /guestBook.html', function() {
  it('test  for post request with file path /guestBook.html', function(done) {
    request(app.serve.bind(app))
      .post('/guestBook.html')
      .send(stringify({name: 'rashmi', comment: 'hi'}))
      .set('Accept', '*/*')
      .expect(302, done);
  });
});

describe('POST /badFile', function() {
  it('test  for get request with bad file', function(done) {
    request(app.serve.bind(app))
      .post('/badFile')
      .set('Accept', '*/*')
      .expect(404, done);
  });
});

describe('PUT /', function() {
  it('test  for put request', function(done) {
    request(app.serve.bind(app))
      .put('/')
      .set('Accept', '*/*')
      .expect(400, done);
  });
});
