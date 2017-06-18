import * as express from 'express';
import * as environment from './environment';
import SetupDbConnection from './startup/SetupDbConnection';
import HandleAppExit from './startup/HandleAppExit';
import SeedDb from './SeedDb/SeedDb';

const app = express();

SetupDbConnection.setup(() => {
    if (!environment.isProduction) {
        console.log('serverjs, seeding');
        new SeedDb().seed();
    }
});

HandleAppExit.handle();

app.listen('1337', () => {
    console.log('Listening on port 1337, production mode is: ' + environment.isProduction);
});

