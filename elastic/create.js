'use strict';
var client = require('./connection.js');

client.indices.putMapping({
    index: 'user_weights_history',
    type: 'profile_history',
    body: {
      'properties': {
        'user_id': {
          'type': 'integer'
        },
        'raw_photo_count': {
          'properties': {
            '0': { 'type': 'integer'},
            '1': { 'type': 'integer'},
            '2': { 'type': 'integer'},
            '3': { 'type': 'integer'},
            '4': { 'type': 'integer'},
            'total': { 'type': 'integer'}
          }
        },
        'photo_count_weight': {
          'properties': {
            '0': { 'type': 'integer'},
            '1': { 'type': 'integer'},
            '2': { 'type': 'integer'},
            '3': { 'type': 'integer'},
            '4': { 'type': 'integer'}
          }
        },
        'created_at': {
          type: 'date'
        },
        'updatedAt': {
          type: 'date'
        }
      }
    }
  }, (err, res, status) => {
    if (err) {
      console.log(err);
      console.log(status);
    }
    console.log('create', res);

});

// client.indices.putMapping({
//     index: 'user_weights_history',
//     type: 'profile_history',
//     body: {
//       'user_id': {
//         'properties': {
//           'message': {type: 'INT'}
//         }
//       },
//       'raw_photo_count': {
//         'properties': {
//           'message': {type: 'JSON'}
//         }
//       },
//       'photo_count_weight': {
//         'properties': {
//           'message': {type: 'JSON'}
//         }
//       },
//       'created_at': {
//         'properties': {
//           'message': {type: 'DATE'}
//         }
//       },
//       'updatedAt': {
//         'properties': {
//           'message': {type: 'DATE'}
//         }
//       }
//     }
//   }, (err, res, status) => {
//     if (err) {
//       console.log(err);
//       console.log(status);
//     }
//     console.log('create', res);
//
// });
