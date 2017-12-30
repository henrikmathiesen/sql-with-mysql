import * as express from 'express';
import { environment, environmentsConstants } from './environment';
import { initDb } from './db/initDb';
import { exitProcessListener } from './exitProcessListener';
import { uncaughtExceptionListener } from './uncaughtExceptionListener';
import { uncaughtRequestErrors } from './uncaughtRequestErrors';
import { seeder } from './seedDb/seeder';
import { deleter } from './seedDb/deleter';
import { routing } from './routing';

const app = express();
const serverListener = () => {
    const port = '1337';

    app.listen(port, () => {
        console.log(`Server is running on port ${port}, environment is ${environment}`);
    });
};

const exitApp = (code) => {
    console.log('Disconnected from Database');
    console.log(`Exiting App with status code ${code}`);
    process.exit(code);
};

const startApp = () => {
    console.log('starting app');
    routing(app);
    uncaughtRequestErrors(app);
    serverListener();
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

    if (environment === environmentsConstants.seed) {
        seeder(() => {
            console.log('Database seeded');
            startApp();
        });
    }
    else if (environment === environmentsConstants.delete) {
        deleter(() => {
            console.log('Database table rows deleted');
            startApp();
        });
    }
    else {
        startApp();
    }
}, () => {
    exitApp(1);
});
