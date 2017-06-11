const isProduction = require('./server/isProduction.js');
const express = require('express');
const app = express();

app.listen(1337, function () {
  console.log('Listening on port 1337, production mode is: ' + isProduction);
});
