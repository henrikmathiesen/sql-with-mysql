import * as express from 'express';
import { isProduction, shouldSeed } from './environment';
import { initDb } from './db/initDb';
import { exitProcessListener } from './exitProcessListener';
import { seeder } from './seedDb/seeder';
import { routing } from './routing';

const server = express();
const serverListener = () => {
    server.listen('1337', () => {
        console.log(`Server is running, production mode is ${isProduction}, should seed is ${shouldSeed}`);
    });
};

initDb(() => {
    console.log('Connected to Database');

    exitProcessListener(() => {
        console.log('Disconnected from Database');
        console.log('Exiting App');
        process.exit();
    });

    if (shouldSeed) {
        seeder(() => { 
            console.log('Database seeded');
            routing(server);
            serverListener();
        });
    }
    else {
        routing(server);
        serverListener();
    }
});
