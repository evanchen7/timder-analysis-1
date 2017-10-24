'use strict';
const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

const sequelize = require('sequelize');
const db = require('../models/index.js');



app.get('/', function (req, res) {
  res.send('Hello World');
});

app.post('/fakedata', (req, res) => {
  return db.User.drop()
  .then(() => db.User.sync({force: true}))
  .then(() => {
    return db.User.create({
        userId: 213125,
        gender: 'M',
        location: 'C',
        photoCount: 2,
        swipesUserId: 213125
    });
  }).catch((err) => { throw err });
});

app.post('/dropdb', (req, res) => {
  return db.User.drop()
  .then(() => { db.User.sync({force: true});});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
