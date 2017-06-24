import { getUsersApi } from './api/users/getUsersApi';
import { getUserByIdApi } from './api/users/getUserByIdApi';

export const routing = (server) => { 
    server.use(getUsersApi);
    server.use(getUserByIdApi);
};
