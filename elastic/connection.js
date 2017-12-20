'use strict';
const elasticsearch = require('elasticsearch');

// var esTransportOpts = {
//   level: 'info',
//   client:
// };
// winston.add(winston.transports.Elasticsearch, esTransportOpts);

var client = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  // log: {
  //   type: 'file',
  //   level: 'trace',
  //   path: '/var/log/elasticsearch.log'
  // }
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
