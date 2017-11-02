'use strict';
const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
const config = require('../config/config.json');
// const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

AWS.config.update({
  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});

const app = Consumer.create({
  queueUrl: config.queueUrl,
  handleMessage: function(message, done){
    if (message.MessageAttributes){
      console.log(message)
    }
    done();
  },
  messageAttributeNames: ['Swipes'],
  batchSize: 5,
  sqs: new AWS.SQS()
});

app.on('error', (err) => {
  console.log(message.err);
});

app.on('empty', ()=> {
  console.log('Queue is empty');
})

app.start();
