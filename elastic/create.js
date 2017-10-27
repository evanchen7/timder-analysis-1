'use strict';
var client = require('./connection.js');

client.indices.create({
    index: 'analysis'
  }, (err, res, status) => {
    if (err) {
      console.log(err);
      console.log(status);
    }
    console.log('create', res);

});
