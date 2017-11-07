'use strict';
const routes = require('express').Router();
const db = require('../models/index.js');
const fakeData = require('../datageneration/usergenerator.js');
const analysis = require('../analysis/weightcalculations.js');
const pgAnalysis = require('../analysis/pgpromiseweight.js');
const pgindex = require ('../models/pgindex.js');

// GET Routes
routes.get('/', (req,res, next) => {
  res.json('Welcome to Timder Analysis, please refer to github documentation!');
});

// Find latest photo count weight associated with user
routes.get('/api/weights/photo/:userid', (req, res, next) => {
  if(req.params.userid) {
    pgindex.any('SELECT * FROM user_weights WHERE user_id = $1', [req.params.userid])
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      console.log(err);
    });
  } else {
    res.sendStatus(404);
  }
});


// Find all weights associated with user
routes.get('/api/weights/:userid/all', (req, res, next) => {
  if(req.params.userid) {
    pgindex.any('SELECT * FROM user_weights WHERE user_id = $1', [req.params.userid])
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      console.log(err);
    });
  } else {
    res.sendStatus(404);
  }
});

// Find weight history of specific user
routes.get('/api/weightshistory/:userid/all', (req, res, next) => {
  if(req.params.userid) {
    pgindex.any('SELECT * FROM user_weights_history WHERE user_id = $1', [req.params.userid])
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      console.log(err);
    });
  } else {
    res.sendStatus(404);
  }
});

// POST Routes

// GENERATE Fake Data
routes.post('/createTables', (req, res) => {
  var weights = db.UserWeights.sync({force: true});
  var weightsHistory = db.UserWeightsHistory.sync({force: true});

  return Promise.all([weights, weightsHistory]).then((results) => {
    console.log('Tables Created', results);
  }).then(() => {
    fakeData.generateInitialWeights(100000);
  })
  .catch((err) => {
    console.log(err);
    res.end();
  });
});

routes.post('/addWeights', (req, res) => {
  db.UserWeights.sync({force: true});
  res.end();
});

routes.post('/addUserData', (req, res) => {
  // fakeData.generateUser(1000000);
  fakeData.generateInitialWeights(1000000);
  res.end();
});

routes.post('/addData1', (req, res) => {
  return db.UserWeights.sync({force: true})
  .then(()=>{
    return fakeData.generateRandomWeights(1000000);
  })
  .then(()=>{
    res.end();
  })
  .catch((err) => {
    throw err;
  });

});

routes.post('/nandapost', (req, res) => {
  if (req.body) {
    // analysis.calculatePhotoWeight(req.body);
    pgAnalysis.pgCalculateWeight(req.body);
    res.end();
  } else {
    res.sendStatus(204);
  }
});

routes.post('/start', (req, res) => {
  fakeData.simulateMatchData();
  res.end();
});

module.exports = routes;
