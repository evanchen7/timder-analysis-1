'use strict';
const db = require('../models/pgindex.js');
const axios = require('axios');
const elasticAdd = require('../elastic/document_add.js');
const pgp = db.$config.pgp;
const weightsTable = new pgp.helpers.ColumnSet(['?user_id', 'raw_photo_count', 'photo_count_weight'], {table: 'user_weights'});
const weightsHistoryTable = new pgp.helpers.ColumnSet(['?user_id', 'raw_photo_count', 'photo_count_weight'], {table: 'user_weights_history'});

var pgCalculateWeight = (swipe) => {
  var currentId = swipe.user_id;
  var swipeCheck = swipe.swipe;
  var compareId = swipe.swiped_id;
  var currentTime = new Date();
  var defaultRaw = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0, total: 0
  };
  var defaultCalculated = {
    0: 0, 1: 0, 2: 0, 3: 0, 4: 0
  };


// Checks if the current user swipes yes
  if (swipeCheck && currentId !== compareId) {

    db.task('pgCalculateWeight', t => {
      var currentWeight = t.one('select * from user_weights where user_id=$1', currentId);
      var swipedId = t.one('select * from users where user_id=$1', compareId);

      return t.batch([currentWeight, swipedId]).spread((curr, swipe) => {
        // console.log('curr', curr['raw_photo_count']);
        // console.log('swipe', swipe['photo_count']);
        var swipeCount = swipe['photo_count'];

        var newRawPhotoCount = curr['raw_photo_count'];
        newRawPhotoCount[swipeCount]++;
        newRawPhotoCount.total++;

        var newPhoto = curr['photo_count_weight'];
        newPhoto[swipeCount] = newRawPhotoCount[swipeCount] / newRawPhotoCount.total;

        var updatedData = {
          'user_id': currentId,
          'raw_photo_count': newRawPhotoCount,
          'photo_count_weight': newPhoto
        };
        var updateUserWeights = pgp.helpers.update([updatedData], weightsTable);
        var updateUserWeightsHistory = pgp.helpers.insert([updatedData], weightsHistoryTable);

        elasticAdd.addDocuments(currentId, newRawPhotoCount, newPhoto);

        t.batch([updateUserWeights, updateUserWeightsHistory]).then((update) => {
          // console.log('UPDATED ', update);
        });
      });
    })
    .catch(error => {
      console.log(error);
    }).finally(()=> {
      // Closes the connection pool when exiting the application
      // pgp.end();
    });
  }
};

module.exports = {
  pgCalculateWeight: pgCalculateWeight
};
