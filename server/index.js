'use strict';
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const db = require('../models/index.js');
const fakeData = require('../datageneration/usergenerator.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
  res.end();
});

app.post('/addData', (req, res) => {
   db.Users.sync({force: true})
    .then(() => {
      return db.UserWeights.sync({force: true})
    .then(() => {
      return db.userSwipes.sync({force: true});})
    .then(() => {
      return fakeData.generateUser(1000000);})
    .then(() => {
      return fakeData.generateInitialWeights(1000000); }); })
    .catch((err) => {
      throw err;
    });
  res.end();
});

app.post('/nandapost', (req, res) => {
  var currentTime = new Date();

  db.userSwipes.create({
   userId: req.body.userId,
   swipedId: req.body.swipedId,
   swipe: req.body.swipe,
   timestamp: req.body.timestamp
  }).then(() => {
    console.log(currentTime.toISOString());
  }).catch((err) => {
    throw err;
  });

  res.end();
});

app.post('/start', (req, res) => {
  fakeData.simulateMatchData();
  res.end();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
