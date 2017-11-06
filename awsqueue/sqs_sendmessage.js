'use strict';
const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/config.json');
const config = require('../config/config.json');

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var randomEvent = () => {
  return {
    'user_id': Math.floor(Math.random() * 10000),
    'swiped_id': Math.floor(Math.random() * 10000),
    swipe: [true, false][Math.floor(Math.random() * 2)],
    timestamp: new Date().toISOString()
  };
};
// 29579
var par = () => {
  return {
    DelaySeconds: 0,
    MessageAttributes: {
      'Swipes': {
        DataType: 'String',
        StringValue: 'Swipe Events'
      }
    },
    MessageBody: JSON.stringify(randomEvent()),
    QueueUrl: config.queueUrl
  };
};

var count = 1000;
while (count > 0) {
  setTimeout( () => {
    sqs.sendMessage(par(), (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);
      }
    });
  }, 500);
  count--;
}
