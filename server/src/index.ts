import * as express from 'express';
import { isProduction, shouldSeed, shouldDelete } from './environment';
import { initDb } from './db/initDb';
import { exitProcessListener } from './exitProcessListener';
import { uncaughtExceptionListener } from './uncaughtExceptionListener';
import { uncaughtRequestErrors } from './uncaughtRequestErrors';
import { seeder } from './seedDb/seeder';
import { deleter } from './seedDb/deleter';
import { routing } from './routing';

const app = express();
const serverListener = () => {
    app.listen('1337', () => {
        console.log(`Server is running, production mode is ${isProduction}, should seed is ${shouldSeed}, should delete is ${shouldDelete}`);
    });
};

const exitApp = (code) => {
    console.log('Disconnected from Database');
    console.log(`Exiting App with status code ${code}`);
    process.exit(code);
};

initDb(() => {
    console.log('Connected to Database');

    exitProcessListener(() => {
        exitApp(0);
    });

    uncaughtExceptionListener((error) => {
        console.log('uncaughtException', error);
        exitApp(1);
    });

    if (shouldSeed && !isProduction) {
        seeder(() => {
            console.log('Database seeded');
            routing(app);
            uncaughtRequestErrors(app);
            serverListener();
        });
    }
    else if (shouldDelete && !isProduction) {
        deleter(() => {
            console.log('Database table rows deleted');
            routing(app);
            uncaughtRequestErrors(app);
            serverListener();
        });
    }
    else {
        routing(app);
        uncaughtRequestErrors(app);
        serverListener();
    }
});
