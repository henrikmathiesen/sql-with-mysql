import * as express from 'express';
import * as environment from './environment';
import SeedUsers from './seedDb/SeedUsers';

const app = express();

if(!environment.isProduction) {
    new SeedUsers().seed();
}

app.listen('1337', () => {
    console.log('Listening on port 1337, production mode is: ' + environment.isProduction);
});

