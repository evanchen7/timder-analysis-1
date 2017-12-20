'use strict';
const promise = require('bluebird');
const awsconfig = require('./awsconfig.js');
const pgp = require('pg-promise')({
   capSQL: true,
   promiseLib: promise
});

// Comment out for local development or AWS

var cn = {
    host: awsconfig.host,
    port: awsconfig.port,
    database: awsconfig.database,
    user: awsconfig.user,
    password: awsconfig.password
};

// var cn = {
//     host: '127.0.0.1', // server name or IP address;
//     port: 5432,
//     database: 'timderanalysis',
//     user: 'evanchen',
//     password: ''
// };

module.exports = pgp(cn);
