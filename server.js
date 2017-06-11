const express = require('express');
const mySql = require('mysql');
const isProduction = require('./server/isProduction.js');
const dbConnection = require('./server/dbConnection.js');

const app = express();
const connection = mySql.createConnection(dbConnection);

connection.connect();
connection.end();

app.listen(1337, function () {
  console.log('Listening on port 1337, production mode is: ' + isProduction);
});
