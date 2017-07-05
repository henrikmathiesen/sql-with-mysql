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
import { getReviewsForGameByIdApi } from './api/games/getReviewsForGameByIdApi';

import { getReviewsApi } from './api/reviews/getReviewsApi';
import { getReviewByIdApi } from './api/reviews/getReviewByIdApi';
import { createReviewApi } from './api/reviews/createReviewApi';
import { updateReviewByIdApi } from './api/reviews/updateReviewByIdApi';
import { deleteReviewByIdApi } from './api/reviews/deleteReviewByIdApi';

export const routing = (app) => { 

    // user
    app.use(getUsersApi);               // /
    app.use(getUserByIdApi);            // /
    app.use(createUserApi);             // /
    app.use(updateUserByIdApi);         // +
    app.use(deleteUserByIdApi);         // /
    app.use(getGamesForUserByIdApi);    // /
    app.use(getReviewsForUserByIdApi);  // /

    // games
    app.use(getGamesApi);               // /
    app.use(getGameByIdApi);            // /
    app.use(createGameApi);             // +
    app.use(updateGameByIdApi);         // +
    app.use(deleteGameByIdApi);         // /
    app.use(getReviewsForGameByIdApi);  // /

    // reviews
    app.use(getReviewsApi);             // /
    app.use(getReviewByIdApi);          // /
    app.use(createReviewApi);           // -
    app.use(updateReviewByIdApi);       // +
    app.use(deleteReviewByIdApi);       // /
};
