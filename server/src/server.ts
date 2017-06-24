import * as express from 'express';
import { isProduction } from './environment';
import { initDb } from './db/initDb';
import { exitProcessListener } from './exitProcessListener';
import { seeder } from './seedDb/seeder';



// DEBUG
// import { getUsersQuery } from './db/queries/users/getUsersQuery';
// import { getUserByIdQuery } from './db/queries/users/getUserByIdQuery';
// import { updateUserQuery } from './db/queries/users/updateUserQuery';
// import { deleteUserByIdQuery } from './db/queries/users/deleteUserByIdQuery';
// import { UserDbo } from './db/dbo/UserDbo';

const server = express();
const serverListener = () => {
    server.listen('1337', () => {
        console.log(`Server is running, production mode is ${isProduction}`);
    });
};

initDb(() => {
    console.log('Connected to Database');

    exitProcessListener(() => {
        console.log('Disconnected from Database');
        console.log('Exiting App');
        process.exit();
    });

    if (!isProduction) {
        seeder(() => { 
            console.log('Database seeded');
            // set up routing
            serverListener();
        });
    }
    else {
        // set up routing
        serverListener();
    }
});
