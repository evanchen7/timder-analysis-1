'use strict';
const models = require('../models/index.js');
const Promise = require('bluebird');
const axios = require('axios');
var count = 0;

var gender = () => {
  var genderArray = ['M', 'F'];
  return genderArray[Math.floor(Math.random() * 2)];
};

var locations = () => {
  var locationArray = ['A', 'B', 'C', 'D', 'E'];
  return locationArray[Math.floor(Math.random() * 5)];
};

var photoCount = () => {
  var photoCountArray = [0, 1, 2, 3];
  return photoCountArray[Math.floor(Math.random() * 4)];
};

var random100 = () => {
  return Math.round(Math.random() * 100);
};

var randomWeight = () => {
 var zero = random100();
 var one = random100();
 var two = random100();
 var three = random100();
 var total = zero + one + two + three;
 return [zero/total, one/total, two/total, three/total];
};

var generateUser = (num) => {
  var userPromises = [];
  for (var i = 1; i < num; i++) {
    var newPromise = {
      userId: i,
      gender: gender(),
      location: locations(),
      photoCount: photoCount()
    };
    userPromises.push(newPromise);
  }

   return Promise.map(userPromises, (prom) => {
    return models.Users.create(prom);
   }, {concurrency: 10}).then(() => {
    console.log('Done');
   }).catch((err) => {
    console.log('Error ', err);
   });
};

var generateInitialWeights = (num) => {
  var weightPromises = [];
  for (var i = 1; i < num; i++){
    var newPromise = {
      userId: i,
      photoCountWeight: {
        0: 0,
        1: 0,
        2: 0,
        3: 0
      }
    };
    weightPromises.push(newPromise);
  }
  return Promise.map(weightPromises, (prom) => {
   return models.UserWeights.create(prom);
  }, {concurrency: 10}).then(() => {
   console.log('Done');
  }).catch((err) => {
   console.log('Error ', err);
  });
};

var generateRandomWeights = (num) => {
  var randomWeightPromises = [];
  for (var i = 1; i < num; i++){
    var randWeights = randomWeight();
    var newPromise1 = {
      userId: Math.floor(Math.random() * 100000),
      photoCountWeight: {
        0: randWeights[0],
        1: randWeights[1],
        2: randWeights[2],
        3: randWeights[3]
      }
    };
    console.log(i);
    randomWeightPromises.push(newPromise1);
  }

  return Promise.map(randomWeightPromises, (prom) => {
   return models.UserWeights.create(prom);
 }, {concurrency: 50}).then(() => {
   console.log('Done');
  }).catch((err) => {
   console.log('Error ', err);
  });
};

var insertMatchEvents = () => {
  var currentTime = new Date();
  var data = {
    userId: Math.floor(Math.random() * 100000),
    swipedId: Math.floor(Math.random() * 100000),
    swipe: [true, false][Math.floor(Math.random() * 2)],
    timestamp: currentTime.toISOString()
  };

  axios.post('http://localhost:3000/nandapost', data)
  .then(() => {
    count++;
    console.log(currentTime.toISOString(), count);
  }).catch((err) => {
    throw err;
  });
};

var simulateMatchData = () => {
   if (count < 500000) {
    setTimeout(()=>{
      simulateMatchData();
    }, 100);
  }
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();
  insertMatchEvents();

};

module.exports = {
  generateUser: generateUser,
  generateInitialWeights: generateInitialWeights,
  generateRandomWeights: generateRandomWeights,
  insertMatchEvents: insertMatchEvents,
  simulateMatchData: simulateMatchData
};
