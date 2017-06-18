import * as express from 'express';
import * as environment from './environment';
import SetupDbConnection from './startup/SetupDbConnection';
import HandleAppExit from './startup/HandleAppExit';


const app = express();


SetupDbConnection.setup();
HandleAppExit.handle();


app.listen('1337', () => {
    console.log('Listening on port 1337, production mode is: ' + environment.isProduction);
});

