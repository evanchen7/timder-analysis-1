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
});

app.post('/addData', (req, res) => {
  // return db.Users.destroy({truncate: true});
   db.Users.sync({force: true})
    .then(() => {
      return db.UserWeights.sync({force: true})
    .then(() => {
      return db.userSwipes.sync({force: true});})
    .then(() => {
      return fakeData.generateUser(100000);})
    .then(() => {
      return fakeData.generateInitialWeights(100000); }); })
    .catch((err) => {
      throw err;
    });
  res.end();

});

app.post('/nandapost', (req, res) => {
  // var data = {
  //   userId: req.body.userId,
  //   swipeId: req.body.swipeId,
  //   swipe: req.body.swipe,
  //   timestamp: req.body.timestamp
  // };
  console.log(req.body)
  // db.userSwipes.create({data}).then((response) => {
  //   res.end();
  // }).catch((err) => {
  //   throw err;
  // });
});

app.post('/trigger', (req, res) => {
  fakeData.insertMatchEvents();
  res.end();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
