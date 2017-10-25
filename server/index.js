'use strict';
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

//const sequelize = require('sequelize');
const db = require('../models/index.js');
const generateUser = require('../datageneration/usergenerator.js');


app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/dropDb', (req, res) => {
  db.Users.sync({force: true})
    .then(() => {
       return db.UserWeights.sync({force: true})
    .then(() => {
       return db.userSwipes.sync({force: true});})
    .catch((err) => {
       throw err;
     });
  });
});

app.post('/addData', (req, res) => {
  // return db.Users.destroy({truncate: true});
   db.Users.sync({force: true})
    .then(() => {
      return db.UserWeights.sync({force: true})
    .then(() => {
      return db.userSwipes.sync({force: true});})
    .then(() => {
      return generateUser.generateUser(100000);})
    .then(() => {
      return generateUser.generateInitialWeights(100000); }); })
    .catch((err) => {
      throw err;
    });
  res.end();

});

app.post('/nandapost', () => {
  
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
