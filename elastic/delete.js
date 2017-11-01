'use strict';
var client = require('./connection.js');

client.indices.delete({
    index: 'user_weights'
  }, (err, res, status) => {
    if (err) {
      console.log(err);
      console.log(status);
    }
    console.log('create', res);
});

client.indices.delete({
    index: 'analysis'
  }, (err, res, status) => {
    if (err) {
      console.log(err);
      console.log(status);
    }
    console.log('create', res);
});
