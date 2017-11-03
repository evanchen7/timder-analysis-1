'use strict';
const models = require('../models/index.js');
const Promise = require('bluebird');
const axios = require('axios');
var fs = require('fs');
// var stream = fs.createWriteStream("./datageneration/userFile.txt");
// var weights = fs.createWriteStream("/Users/evanchen/desktop/weights.csv");


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
 var four = random100();
 var total = zero + one + two + three + four;
 return [zero/total, one/total, two/total, three/total, four/total, total];
};

// TODO ------------------------------------------------------------------


// var writeToWeightsFile = (data) => {
//
//   weights.write(data, (err) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log('END-----------------', new Date());
//     }
//   });
//   weights.end();
// };

// var writeToUserFile = (data) => {
//   stream.write(data, (err) => {
//     if (err) {
//       console.log(err.message);
//     } else {
//       console.log('END-----------------', new Date());
//     }
//   });
//   stream.end();
// };

var generateUser = (num) => {
  console.log('START-----------------', new Date());
  var userPromises = [];
  for (var i = 0; i < num; i++) {
    var newPromise = {
      userId: i,
      gender: gender(),
      location: locations(),
      photoCount: photoCount()
    };
    userPromises.push(newPromise);
  }

 Promise.map(userPromises, (prom) => {
    return models.Users.create(prom).catch((err) => {
      console.log(err);
    });
  }, {concurrency: 100}).then(() => {
    console.log('END-----------------', new Date());
   }).catch((err) => {
    console.log('Error ', err);
   });
};


var generateInitialWeights = (num) => {
  var currentTime = new Date();
  var raw = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    'total': 0
  };
  var count = {
    '0': 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0
  };

  var results = '';
  for (var i = 0; i < num; i++) {
    results += i + '|' + i + '|' + JSON.stringify(raw) +
    '|' + JSON.stringify(count) + '|' +
    JSON.stringify(currentTime.toISOString()) +
    '|' + JSON.stringify(currentTime.toISOString()) + '\n';
  }

 writeToWeightsFile(results);
};

var insertMatchEvents = () => {
  var currentTime = new Date();
  var data = {
    'user_id': Math.floor(Math.random() * 1000000),
    'swiped_id': Math.floor(Math.random() * 1000000),
    swipe: [true, false][Math.floor(Math.random() * 2)],
    timestamp: currentTime.toISOString()
  };

  axios.post('http://localhost:3000/nandapost', data)
  .then(() => {
    count++;
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
};

module.exports = {
  generateUser: generateUser,
  generateInitialWeights: generateInitialWeights,
  insertMatchEvents: insertMatchEvents,
  simulateMatchData: simulateMatchData
};
