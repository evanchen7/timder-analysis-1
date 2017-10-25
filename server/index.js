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

app.post('/fakedata', (req, res) => {
  // return generateUser.generateUser(100)
  // .then(() => {
  //   generateUser.generateInitialWeights(100)
  // .then((something) => {
  //   res.json(something);
  //   });
  // }).catch((err) => {
  //   throw err;
  // });
  return generateUser.generateUser(131).then(() => {
    res.end()
  }).catch((err) => {console.log(err); return;});

});

// app.post('/fakedata', (req, res) => {
//   generateUser.generateUser(100).then((something) => {
//     res.json(something);
//   }).catch((err) => { throw err; });
//
// });

app.post('/dropdb', (req, res) => {
  // return db.Users.destroy({truncate: true});
   db.Users.sync({force: true})
    .then(() => {
      return db.UserWeights.sync({force: true})
    .then(() => {
      return db.userSwipes.sync({force: true});
    }).then(() => {
      return generateUser.generateUser(131);
    }).then(() => {
      return generateUser.generateInitialWeights(131);
    });
    })

    .catch((err) => {
      throw err;
    });
  res.end();

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
