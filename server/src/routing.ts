import { getUsersApi } from './api/users/getUsersApi';
import { getUserByIdApi } from './api/users/getUserByIdApi';
import { createUserApi } from './api/users/createUserApi';
import { updateUserByIdApi } from './api/users/updateUserByIdApi';
import { deleteUserByIdApi } from './api/users/deleteUserByIdApi';

import { getGamesApi } from './api/games/getGamesApi';

export const routing = (server) => { 

    // user
    server.use(getUsersApi);
    server.use(getUserByIdApi);
    server.use(createUserApi);
    server.use(updateUserByIdApi);
    server.use(deleteUserByIdApi);

    // games
    server.use(getGamesApi);

};
