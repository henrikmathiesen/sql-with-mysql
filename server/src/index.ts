import * as express from 'express';
import { isProduction, shouldSeed, shouldDelete } from './environment';
import { initDb } from './db/initDb';
import { exitProcessListener } from './exitProcessListener';
import { uncaughtExceptionListener } from './uncaughtExceptionListener';
import { seeder } from './seedDb/seeder';
import { deleter } from './seedDb/deleter';
import { routing } from './routing';

const app = express();
const serverListener = () => {
    app.listen('1337', () => {
        console.log(`Server is running, production mode is ${isProduction}, should seed is ${shouldSeed}, should delete is ${shouldDelete}`);
    });
};

initDb(() => {
    console.log('Connected to Database');

    exitProcessListener(() => {
        console.log('Disconnected from Database');
        console.log('Exiting App');
        process.exit();
    });

    uncaughtExceptionListener((error) => { 
        console.log('uncaughtException', error);
        console.log('Disconnected from Database');
        console.log('Exiting App with status code 1');
        process.exit(1);
    });

    if (shouldSeed) {
        seeder(() => {
            console.log('Database seeded');
            routing(app);
            serverListener();
        });
    }
    else if (shouldDelete) {
        deleter(() => {
            console.log('Database table rows deleted');
            routing(app);
            serverListener();
        });
    }
    else {
        routing(app);
        serverListener();
    }
});
