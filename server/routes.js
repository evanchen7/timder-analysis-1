'use strict';
const routes = require('express').Router();
const db = require('../models/index.js');
const fakeData = require('../datageneration/usergenerator.js');
const analysis = require('../analysis/weightcalculations.js');

// GET Routes

routes.get('/getEventSwipes',  (req, res, next) => {
  //grab swipes from event service
});

// Find latest photo count weight associated with user
routes.get('/api/weights/photo/', (req, res, next) => {
  if(req.query.id) {
    db.UserWeights.findOne({ where: {userId: req.query.id}, order: [['createdAt', 'DESC']] })
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      console.log(err);
      next();
    });
  } else {
    res.sendStatus(204);
  }
});

// Find all weights associated with user
routes.get('/api/weights/all', (req, res, next) => {
  if(req.query.id) {
    db.UserWeights.findAll({ where: {userId: req.query.id}})
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      console.log(err);
      next();
    });
  } else {
    res.sendStatus(204);
  }
});

routes.get('/api/weightshistory/all', (req, res, next) => {
  if(req.query.id) {
    db.UserWeights.findAll({ where: {userId: req.query.id}})
    .then((user) => {
      res.json(user);
    }).catch((err) => {
      console.log(err);
      next();
    });
  } else {
    res.sendStatus(204);
  }
});


//POST Routes
routes.post('/dropDb', (req, res) => {
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

routes.post('/addData', (req, res) => {
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
  db.userSwipes.create({
   userId: req.body.userId,
   swipedId: req.body.swipedId,
   swipe: req.body.swipe,
   timestamp: req.body.timestamp
  }).then(() => {

  }).catch((err) => {
    throw err;
  });
  res.end();
});

// Generates fake POST requests
routes.post('/start', (req, res) => {
  fakeData.simulateMatchData();
  res.end();
});

module.exports = routes;
