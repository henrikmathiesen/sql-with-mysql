import { getUsersApi } from './api/users/getUsersApi';

export const routing = (server) => { 
    server.use(getUsersApi);
};
