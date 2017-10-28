'use strict';

const models = require('../models/index.js');
const Promise = require('bluebird');
const axios = require('axios');

// Get user swipes from event service
// TODO find event service's API

var calculateBulkWeights = (start, end) => {
  var results = {};
  axios.get('/swipes', end ? { params: { timestamp: start, timestampEnd: end }} :
  { params: { timestamp: start }} )
  .then((swipes) => {
    swipes.forEach((entry) => {
      results[entry] = [] || results[entry].push(entry);
    });
  }).then(() => {
    // do something to results
  }).catch((err) => {
    console.log('grabUserSwipes', err);
  });
};

var calculatePhotoWeight = (swipe) => {
  var currentId = swipe.user_id;
  var swipeCheck = swipe.swipe;
  var compareId = swipe.swiped_id;
  var timestamp = swipe.timestamp;

  // use ternary operator
  if (swipeCheck) {
    // models.UserWeights.upsert();
    models.UserWeights.findOrCreate({
      limit:1,
      where:{ userId: currentId },
      defaults: { photoCountWeight: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, total: 0 } }
    })

  }
};

// listen for swipe events
  // check if the current userId swiped yes
    // lookup the current userId
    // check if there is a userId
    // and retrieve weight profile from weights table
    // lookup the swipedId photo count
    // calculate the weights and update the total count and date
  // else do nothing with the log

// Update userId's user weights and total count and last calculated date
module.exports = {
  calculateBulkWeights: calculateBulkWeights,
  calculatePhotoWeight: calculatePhotoWeight
};
