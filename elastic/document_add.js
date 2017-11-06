'use strict';
var client = require('./connection.js');

module.exports.addDocuments = (userId, newRawPhotoCount, newPhoto) => {
  client.index({
    index: 'user_weights_history',
    type: 'profile_history',
    body: {
      'user_id': userId,
      'raw_photo_count': newRawPhotoCount,
      'photo_count_weight': newPhoto,
      'created_at': new Date(),
      'updatedAt': new Date()
    },
    refresh: true
  });
};
