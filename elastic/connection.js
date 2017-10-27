'use strict';
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'https://search-timderanalysis2-a5c5f3p3qg5ukxfyxgyxyo2l3q.us-west-1.es.amazonaws.com',
  log: 'trace'
});

client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});



module.exports = client;
