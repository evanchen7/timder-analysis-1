'use strict';
const expect = require('chai').expect;
const request = require('request');
const serverUrl = 'http://127.0.0.1:8080';
const db = require('../models/index.js');
const pgindex = require ('../models/pgindex.js');
const testUser = 999999999;
const raw = {
  '0': 0,
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0,
  'total': 0
};
const count = {
  '0': 0,
  '1': 0,
  '2': 0,
  '3': 0,
  '4': 0
};
const newDate = new Date().toISOString();

// Make sure the database and server is running

describe ('Timder Analysis Server', function() {

  before(function(){
    var query = 'INSERT INTO user_weights(weight_id, user_id, raw_photo_count, photo_count_weight, created_at, updated_at) VALUES($1, $2, $3, $4, $5, $6) RETURNING user_id';
    pgindex.one(query,[testUser, testUser, raw, count, newDate, newDate])
    .catch((err) => {
      console.log(err);
    });
  });

  it('Should receive a 200 status code when GET is made to /', function(done) {
    request(serverUrl, function(err, res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('Should receive a 404 status code when GET is made to /api/weights/photo/', function(done) {
    request(serverUrl + '/api/weights/photo/', function(err, res) {
      expect(res.statusCode).to.equal(404);
      done();
    });
  });

  it('Should receive 200 status code when a userid is given', function(done) {
    request(serverUrl + '/api/weights/photo/' + testUser, function(err, res) {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });

  it('Should receive an object when a userid is given', function(done) {
    request(serverUrl + '/api/weights/photo/' + testUser, function(err, res) {
      expect(res.statusCode).to.equal(200);
      expect(typeof JSON.parse(res.body)).to.equal('object');
      done();
    });
  });

  it('Should contain user weight properties from GET request', function(done) {
    request(serverUrl + '/api/weights/photo/' + testUser, function(err, res) {
      var obj = JSON.parse(res.body);
      expect(obj[0]['weight_id']).to.equal(testUser);
      expect(obj[0]['user_id']).to.equal(testUser);
      expect(typeof obj[0]['raw_photo_count']).to.equal('object');
      expect(typeof obj[0]['photo_count_weight']).to.equal('object');
      expect(obj[0]['created_at']).to.equal(newDate);
      expect(obj[0]['updated_at']).to.equal(newDate);
      done();
    });
  });

  after(function(){
    pgindex.result('DELETE FROM user_weights WHERE user_id = $1', [testUser])
    .then((result) => {
      console.log('User Deleted: ', result);
    }).catch((err) => {
      console.log(err);
    });
  });
});
