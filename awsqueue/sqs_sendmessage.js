'use strict';
const AWS = require('aws-sdk');

AWS.config.loadFromPath('../config/config.json');

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var params = {
 DelaySeconds: 10,
 MessageAttributes: {
  "Title": {
    DataType: "String",
    StringValue: "The Whistler"
   },
  "Author": {
    DataType: "String",
    StringValue: "John Grisham"
   },
  "WeeksOn": {
    DataType: "Number",
    StringValue: "6"
   }
 },
 MessageBody: "Information about current NY Times fiction bestseller for week of 12/11/2016.",
 QueueUrl: "https://sqs.us-west-1.amazonaws.com/224532707363/SQS_QUEUE_NAME"
}

var par = {
 DelaySeconds: 10,
 MessageAttributes: {
  "Swipes": {
    DataType: "String",
    StringValue: "The Whistler"
   }
 },
 MessageBody: "testSwipes.",
 QueueUrl: "https://sqs.us-west-1.amazonaws.com/224532707363/SQS_QUEUE_NAME"
}

var count = 300;
while (count > 0) {
  setTimeout( () => {
    sqs.sendMessage(params, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);

      }
    });
  }, 500)
  count--
}

var count1 = 300;
while (count1 > 0) {
  setTimeout( () => {
    sqs.sendMessage(par, (err, data) => {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data);

      }
    });
  }, 500)
  count1--
}
