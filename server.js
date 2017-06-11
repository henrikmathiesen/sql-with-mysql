const express = require('express');
const mySql = require('mysql');
const isProduction = require('./server/isProduction.js');
const dbConnection = require('./server/dbConnection.js');

const app = express();
const connection = mySql.createConnection(dbConnection);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) throw error;
  console.log('The solution is: ', JSON.stringify(results));
});

connection.end();

app.listen(1337, () => {
  console.log('Listening on port 1337, production mode is: ' + isProduction);
});
