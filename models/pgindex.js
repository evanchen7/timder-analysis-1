'use strict';
const promise = require('bluebird');
const pgp = require('pg-promise')({
   capSQL: true,
   promiseLib: promise
});

var cn = {
    host: '127.0.0.1', // server name or IP address;
    database: 'timderanalysis',
    user: 'evanchen',
    password: ''
};

module.exports = pgp(cn);
