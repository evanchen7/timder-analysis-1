'use strict';
const models = require('../models/index.js');

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

var generateUser = (num) => {
  var userPromises = [];
  for (var i = 1; i < num; i++) {
    var newPromise = models.Users.create({
      userId: i,
      gender: gender(),
      location: locations(),
      photoCount: photoCount()
    });
    userPromises.push(newPromise);
  }

  return Promise.all(userPromises).then((users) => {
    console.log(users);
  }).catch((err) => {
    throw err;
  });
};

var generateInitialWeights = (num) => {
  var weightPromises = [];
  for (var i = 1; i < num; i++){
    var newPromise = models.UserWeights.create({
      userId: i,
      photoCountWeight: {
        0: 0,
        1: 0,
        2: 0,
        3: 0
      }
    });
    weightPromises.push(newPromise);
  }

  return Promise.all(weightPromises).then((users) => {
    console.log(users);
  }).catch((err) => {
    throw err;
  });
};

module.exports = {
  generateUser: generateUser,
  generateInitialWeights: generateInitialWeights
};
