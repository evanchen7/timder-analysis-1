'use strict';
const db = require('../models/pgindex.js');
// const elasticAdd = require('../elastic/document_add.js');
const pgp = db.$config.pgp;
const userUrl = 'http://Timder-LB-89480342.us-west-1.elb.amazonaws.com';
const axios = require('axios');
const weightsHistoryTable = new pgp.helpers.ColumnSet(['?user_id', 'raw_photo_count', 'photo_count_weight', 'created_at', 'updated_at'], {
  table: 'user_weights_history'
});
const userWeightsTable = new pgp.helpers.ColumnSet(['?user_id', 'raw_photo_count', 'photo_count_weight', 'created_at', 'updated_at'], {
  table: 'user_weights'
});
const returnInitialData = (id) => {
  return  {
    'user_id': id,
    'raw_photo_count': { 0: 20, 1: 20, 2: 20, 3: 20, 4: 20, total: 100 },
    'photo_count_weight': { 0: 0.2, 1: 0.2, 2: 0.2, 3: 0.2, 4: 0.2 },
    'created_at': new Date().toISOString(),
    'updated_at': new Date().toISOString()
  };
};

// {"user_id":7480221,"swiped_id":2195414,"swipe":1,"match":1,"timestamp":"2017-11-07"}

var getInsertUserId = (id) => {
  const insertInitialWeights = pgp.helpers.insert([returnInitialData(id)], userWeightsTable);

  return db.task('getInsertUserId', t => {
          return t.oneOrNone('SELECT * FROM user_weights WHERE user_id=$1', id) // u => u && u['user_id']
              .then(userId => {
                  return userId || t.one(insertInitialWeights + 'RETURNING *');
              });
      });
};

var pgCalculateWeight = (data) => {
  var swipe = JSON.parse(data);
  var currentId = swipe['user_id'];
  var compareId = swipe['swiped_id'];
  // var eventDate = swipe.timestamp;
  var swipeCheck = swipe.swipe;


  // Checks if the current user swipes yes
  if (swipeCheck === 1 && currentId !== compareId) {

    db.task('pgCalculateWeight', t => {
        // var currentWeight = getInsertUserId(currentId);

      var initial = pgp.helpers.insert([returnInitialData(currentId)], userWeightsTable);
      var currentWeight = db.oneOrNone('SELECT * FROM user_weights WHERE user_id=$1', currentId) // u => u && u['user_id']
      .then(userId => {
          return userId || db.one(initial + 'RETURNING *');
      });
      // var swipedId = db.one('select * from users where user_id=$1', compareId);
      var swipedId = axios.get(userUrl + '/user', { 'params': { 'query': compareId }} );

      t.batch([currentWeight, swipedId]).spread((curr, swipe) => {

        var swipeCount = swipe.photoCount;
        if (swipeCount >= 4) {
          swipeCount = 4;
        }
        var newRawPhotoCount = curr['raw_photo_count'];
        newRawPhotoCount[swipeCount]++;
        newRawPhotoCount.total++;

        var newPhoto = curr['photo_count_weight'];
        newPhoto[swipeCount] = newRawPhotoCount[swipeCount] / newRawPhotoCount.total;

        var updatedData = {
          'user_id': currentId,
          'raw_photo_count': newRawPhotoCount,
          'photo_count_weight': newPhoto,
          'created_at': new Date().toISOString(),
          'updated_at': new Date().toISOString()
        };

        var updateUserWeights = db.none('UPDATE user_weights SET raw_photo_count = $1, photo_count_weight = $2, updated_at = $3 WHERE user_id = $4', [newRawPhotoCount, newPhoto, updatedData['updated_at'], currentId]);
        var updateUserWeightsHistory = pgp.helpers.insert([updatedData], weightsHistoryTable);

        t.batch([updateUserWeights, db.none(updateUserWeightsHistory)]);

        });
      })
      .catch(error => {
        console.log('LOOK HERE:', error);
      }).finally(() => {
        console.log('Query Complete:', Date.now());
      });
  }
};

module.exports = {
  pgCalculateWeight: pgCalculateWeight,
  getInsertUserId: getInsertUserId
};
