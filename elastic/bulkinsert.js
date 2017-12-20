'use strict';
var client = require('./connection.js');

client.bulk({
  body:[{}]
}, (err, resp)=> {
  if (err) {
    console.log(err);
  }
  console.log(resp);
});

var example = {
  'index': {
    '_index': 'user_weights_history',
    'type': 'profile_history',
    '_id': 'id'
  }
}
