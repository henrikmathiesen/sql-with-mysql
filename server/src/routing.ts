import { getUsersApi } from './api/users/getUsersApi';
import { getUserByIdApi } from './api/users/getUserByIdApi';
import { createUserApi } from './api/users/createUserApi';
import { updateUserByIdApi } from './api/users/updateUserByIdApi';
import { deleteUserByIdApi } from './api/users/deleteUserByIdApi';

import { getGamesApi } from './api/games/getGamesApi';
import { getGameByIdApi } from './api/games/getGameByIdApi';
//import { createGameApi } from './api/games/createGameApi';

import { deleteGameByIdApi } from './api/games/deleteGameByIdApi';

import { getReviewsApi } from './api/reviews/getReviewsApi';
import { getReviewByIdApi } from './api/reviews/getReviewByIdApi';

import { deleteReviewByIdApi } from './api/reviews/deleteReviewByIdApi';

export const routing = (server) => { 

    // user
    server.use(getUsersApi);
    server.use(getUserByIdApi);
    server.use(createUserApi);
    server.use(updateUserByIdApi);
    server.use(deleteUserByIdApi);

    // games
    server.use(getGamesApi);
    server.use(getGameByIdApi);
    //server.use(createGameApi);
    server.use(deleteGameByIdApi);

    // reviews
    server.use(getReviewsApi);
    server.use(getReviewByIdApi);
    server.use(deleteReviewByIdApi);
};
