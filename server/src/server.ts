import * as express from 'express';
import { isProduction } from './environment';
import { initDb } from './db/initDb';
import { exitProcess } from './exitProcess';

// DEBUG
import { getUsersQuery } from './db/queries/users/getUsersQuery';
import { getUserByIdQuery } from './db/queries/users/getUserByIdQuery';
import { updateUserQuery } from './db/queries/users/updateUserQuery';
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

    getUserByIdQuery(15, (user: UserDbo) => {
        user.name = 'Bertil';

        updateUserQuery(user, () => { 
            console.log('user updated');
        });
    });

    // getUsersQuery((users: any) => { 
    //     console.log(Array.isArray(users[0]));
    // });

    // /DEBUG_____________________________________________________________________


    // seed
    // set up routing

    server.listen('1337', () => {
        console.log(`Server is running, production mode is ${isProduction}`);
    });
});
