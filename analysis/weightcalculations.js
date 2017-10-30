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
    return swipes.map((entry) => {
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
  var currentTime = new Date();
  var defaultRaw = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, total: 0 };
  var defaultCalculated = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
  console.log(swipe)

  models.Users.findById(compareId).then((results) => {
    console.log(results);
  })

  if (swipeCheck && currentId === compareId) {
    var currentIdWeights = models.UserWeights.findOrCreate({
      where:{ userId: currentId },
      defaults: { rawPhotoCount: defaultRaw, photoCountWeight: defaultCalculated, createdAt: currentTime.toISOString() }
    })
    // .catch((err) => { throw err; });

    var swiped = models.Users.findById(compareId).then((results) => {
      console.log(results);
    })
    // .catch((err) => {
    //   throw err
    // });

    Promise.all([currentIdWeights, swiped]).spread((curr, swipe) => {
      console.log(curr)
      console.log(swipe)
      var newCurrentIdWeights = results[0];
      var swipeResult = results[1];
      var swipeCount = swipeResult.photoCount;


      // Updates the rawPhotoCount property
      var newRawPhotoCount = newCurrentIdWeights.rawPhotoCount;
      newRawPhotoCount[swipeCount]++;
      newRawPhotoCount.total++;

      // Updates the photoCountWeight from the rawPhotoCount property
      var newPhoto = newCurrentIdWeights.photoCountWeight;
      newPhoto[swipeCount] = newRawPhotoCount[swipeCount] / newRawPhotoCount.total;

      // Updates the UserWeights table with the new fields
      models.UserWeights.update({
        rawPhotoCount: newRawPhotoCount,
        photoCountWeight: newPhoto,
        createdAt: currentTime.toISOString()
       },
        { where: { userId: currentId }
      }).then(() => {

      // Inserts a new row in the UserWeightsHistory table
        models.UserWeightsHistory.create({
          userId: currentId,
          rawPhotoCount: newRawPhotoCount,
          photoCountWeight: newPhoto,
          createdAt: currentTime.toISOString()
        });

      });
    }).catch((err) => {
      console.log(err);
    });
  } else {
    console.log(swipeCheck)
  }
};

module.exports = {
  calculateBulkWeights: calculateBulkWeights,
  calculatePhotoWeight: calculatePhotoWeight
};
