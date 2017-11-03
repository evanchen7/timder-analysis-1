'use strict';
const db = require('../models/pgindex.js');
const elasticAdd = require('../elastic/document_add.js');
const pgp = db.$config.pgp;
const weightsHistoryTable = new pgp.helpers.ColumnSet(['?user_id', 'raw_photo_count', 'photo_count_weight', 'created_at', 'updated_at'], {
  table: 'user_weights_history'
});

var pgCalculateWeight = (data) => {
  var swipe = JSON.parse(data);
  var currentId = swipe.user_id;
  var swipeCheck = swipe.swipe;
  var compareId = swipe.swiped_id;

  // Checks if the current user swipes yes
  if (swipeCheck && currentId !== compareId) {

    db.task('pgCalculateWeight', t => {
        var currentWeight = t.one('select * from user_weights where user_id=$1', currentId);
        var swipedId = t.one('select * from users where user_id=$1', compareId);

        return t.batch([currentWeight, swipedId]).spread((curr, swipe) => {

          var swipeCount = swipe['photo_count'];

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

          var updateUserWeights = db.none('UPDATE user_weights SET raw_photo_count = $1, photo_count_weight = $2, updated_at = $3 WHERE user_id = $4', [newRawPhotoCount, newPhoto, updatedData['updated_at'], currentId])
          var updateUserWeightsHistory = pgp.helpers.insert([updatedData], weightsHistoryTable);

          t.batch([updateUserWeights, db.none(updateUserWeightsHistory)])
            .then(() => {
              elasticAdd.addDocuments(currentId, newRawPhotoCount, newPhoto);
            });
        });
      })
      .catch(error => {
        throw error;
      }).finally(() => {
        console.log('Query Complete:', Date.now());
      });
  }
};

module.exports = {
  pgCalculateWeight: pgCalculateWeight
};
