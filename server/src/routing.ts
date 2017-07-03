import { getUsersApi } from './api/users/getUsersApi';
import { getUserByIdApi } from './api/users/getUserByIdApi';
import { createUserApi } from './api/users/createUserApi';
import { updateUserByIdApi } from './api/users/updateUserByIdApi';
import { deleteUserByIdApi } from './api/users/deleteUserByIdApi';
import { getGamesForUserByIdApi } from './api/users/getGamesForUserByIdApi'
import { getReviewsForUserByIdApi } from './api/users/getReviewsForUserByIdApi';

import { getGamesApi } from './api/games/getGamesApi';
import { getGameByIdApi } from './api/games/getGameByIdApi';
import { createGameApi } from './api/games/createGameApi';
import { updateGameByIdApi } from './api/games/updateGameByIdApi';
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
    server.use(getGamesForUserByIdApi);
    server.use(getReviewsForUserByIdApi);

    // games
    server.use(getGamesApi);
    server.use(getGameByIdApi);
    server.use(createGameApi);
    server.use(updateGameByIdApi);
    server.use(deleteGameByIdApi);

    // reviews
    server.use(getReviewsApi);
    server.use(getReviewByIdApi);
    server.use(deleteReviewByIdApi);
};
