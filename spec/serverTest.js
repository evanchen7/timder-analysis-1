'use strict';
const expect = require('chai').expect;
const request = require('request');
const serverUrl = 'http://127.0.0.1:8080';

// Make sure the server is running

describe ('Timder Analysis Server', function() {

  it ('Should receive a 200 status code when GET is made to /', function(done) {
    request(serverUrl, function(err, res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it ('Should receive a 204 status code when GET is made to /api/weights/photo/', function(done) {
    request(serverUrl + '/api/weights/photo/', function(err, res) {
      expect(res.statusCode).to.equal(204);
      done();
    });
  });


});
