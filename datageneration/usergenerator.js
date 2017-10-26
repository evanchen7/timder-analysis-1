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

// var randomGenerator = (arr) => {
//   return arr[Math.floor(Math.random() * arr.length)];
// };

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

   Promise.map(userPromises, (prom) => {
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

  Promise.map(weightPromises, (prom) => {
   return models.UserWeights.create(prom);
  }, {concurrency: 10}).then(() => {
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
  insertMatchEvents: insertMatchEvents,
  simulateMatchData: simulateMatchData
};
