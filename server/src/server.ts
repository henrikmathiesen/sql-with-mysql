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

initDb(() => {
    console.log('Connected to Database');

    exitProcessListener(() => {
        console.log('Disconnected from Database');
        console.log('Exiting App');
        process.exit();
    });

    seeder();

    // deleteUserByIdQuery(999)
    //     .then(() => {
    //         console.log('user deleted');
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // seedUsers(() => { 
    //     console.log('users seeded');
    // });

    // getUserByIdQuery(15)
    //     .then((user: UserDbo) => {
    //         console.log('user s', user);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // getUsersQuery()
    //     .then((users: UserDbo[]) => { 
    //         console.log('users s', users);
    //     })
    //     .catch((error) => { 
    //         console.log(error);
    //     });

    // set up routing

    server.listen('1337', () => {
        console.log(`Server is running, production mode is ${isProduction}`);
    });
});
