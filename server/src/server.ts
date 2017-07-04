import * as express from 'express';
import { isProduction, shouldSeed, shouldDelete } from './environment';
import { initDb } from './db/initDb';
import { exitProcessListener } from './exitProcessListener';
import { uncaughtExceptionListener } from './uncaughtExceptionListener';
import { seeder, deleter } from './seedDb/seeder';
import { routing } from './routing';

const server = express();
const serverListener = () => {
    server.listen('1337', () => {
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
            routing(server);
            serverListener();
        });
    }
    else if (shouldDelete) {
        deleter(() => {
            console.log('Database table rows deleted');
            routing(server);
            serverListener();
        });
    }
    else {
        routing(server);
        serverListener();
    }
});
