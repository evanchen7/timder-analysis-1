'use strict';
const promise = require('bluebird');
const pgp = require('pg-promise')({
   capSQL: true,
   promiseLib: promise
});

// Comment out for local development or AWS

// var cn = {
//     host: 'timderanalysistest.cr7kqfpfltan.us-west-1.rds.amazonaws.com',
//     port: 5432,
//     database: 'timderanalysistest',
//     user: 'evanchen',
//     password: 'Gvpix5597!'
// };

var cn = {
    host: '127.0.0.1', // server name or IP address;
    port: 5432,
    database: 'timderanalysis',
    user: 'evanchen',
    password: ''
};

module.exports = pgp(cn);
