import * as express from 'express';
import { isProduction } from './environment';
import { initDb } from './db/initDb';
import { exitProcess } from './exitProcess';

// DEBUG
import { getUsersQuery } from './db/queries/users/getUsersQuery';
import { getUserByIdQuery } from './db/queries/users/getUserByIdQuery';
import { updateUserQuery } from './db/queries/users/updateUserQuery';
import { deleteUserByIdQuery } from './db/queries/users/deleteUserByIdQuery';
import { UserDbo } from './db/dbo/UserDbo';

const server = express();

initDb(() => {
    console.log('Connected to Database');

    exitProcess(() => {
        console.log('Disconnected from Database');
        console.log('Exiting App');
        process.exit();
    });


    // DEBUG_____________________________________________________________________

    getUserByIdQuery(17)
        .then((user: UserDbo) => { 
            console.log(user);
        })
        .catch((error) => { 
            console.log(error);
        });

    // /DEBUG_____________________________________________________________________


    // seed
    // set up routing

    server.listen('1337', () => {
        console.log(`Server is running, production mode is ${isProduction}`);
    });
});
