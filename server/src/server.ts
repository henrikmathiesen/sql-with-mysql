import * as express from 'express';
import * as environment from './environment';


const app = express();





app.listen('1337', () => {
    console.log('Listening on port 1337, production mode is: ' + environment.isProduction);
});

