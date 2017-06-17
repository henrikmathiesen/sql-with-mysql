import * as express from 'express';
import * as mySql from 'mysql';
import * as isProduction from './isProduction';
import * as dbConnection from './dbConnection';

const app = express();
const connection = mySql.createConnection(dbConnection.config);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', JSON.stringify(results));
});

connection.end();

app.listen('1337', () => { 
    console.log('Listening on port 1337, production mode is: ' + isProduction.flag);
});

