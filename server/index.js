'use strict';
const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connect all routes to app
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
