'use strict';
const Consumer = require('sqs-consumer');
const AWS = require('aws-sdk');
const config = require('../config/config.json');
const analysis = require('../analysis/pgpromiseweight.js');

AWS.config.update({
  region: config.region,
  accessKeyId: config.accessKeyId,
  secretAccessKey: config.secretAccessKey
});

// app will handle incoming messages from SQS
const app = Consumer.create({
    queueUrl: config.queueUrl,
    handleMessage: function(message, done){
// Messages will be sent to elasticsearch and stored in database
      if (message.MessageAttributes){
        analysis.pgCalculateWeight(message.Body);
      }
      done();
    },
    messageAttributeNames: ['Swipes'],
    batchSize: 10,
    sqs: new AWS.SQS(),
});


app.on('error', (err) => {
  console.log(err.message);
});

app.on('empty', ()=> {
  console.log('Queue is empty');
});

// app will automatically poll for messages in AWS SQS
app.start();
