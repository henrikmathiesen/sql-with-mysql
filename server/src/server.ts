import * as express from 'express';
import { isProduction } from './environment';
import { initDb } from './db/initDb';
import { exitProcess } from './exitProcess';

const server = express();

initDb(() => {
    console.log('Connected to Database');

    exitProcess(() => {
        console.log('Disconnected from Database');
        console.log('Exiting App');
        process.exit();
    });

    // seed
    // set up routing

    server.listen('1337', () => {
        console.log(`Server is running, production mode is ${isProduction}`);
    });
});
