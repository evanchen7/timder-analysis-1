'use strict';
const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config/config.json');
const config = require('../config/config.json');

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

// {"user_id":7480221,"swiped_id":2195414,"swipe":1,"match":1,"timestamp":"2017-11-07"}

var randomEvent = () => {
  return {
    'user_id': Math.floor(Math.random() * 10000),
    'swiped_id': Math.floor(Math.random() * 10000),
    swipe: [0, 1][Math.floor(Math.random() * 2)],
    timestamp: new Date().toISOString().substring(0, 10)
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

var count = 10000;
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
