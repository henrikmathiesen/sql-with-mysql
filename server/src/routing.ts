import { getUsersApi } from './api/users/getUsersApi';
import { getUserByIdApi } from './api/users/getUserByIdApi';
import { createUserApi } from './api/users/createUserApi';
import { updateUserByIdApi } from './api/users/updateUserByIdApi';

export const routing = (server) => { 
    server.use(getUsersApi);
    server.use(getUserByIdApi);
    server.use(createUserApi);
    server.use(updateUserByIdApi);
};
