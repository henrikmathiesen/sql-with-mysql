import { deleteAllReviews } from './deleteAllReviews';
import { deleteAllGames } from './deleteAllGames';
import { deleteAllUsers } from './deleteAllUsers';

import { seedReviews } from './seedReviews';
import { seedGames } from './seedGames';
import { seedUsers } from './seedUsers';

import { getUsersQuery } from '../db/queries/users/getUsersQuery';
import { UserDbo } from '../db/dbo/UserDbo';

import { getGamesQuery } from '../db/queries/games/getGamesQuery';
import { GameDbo } from '../db/dbo/GameDbo';

let _addedByUser: UserDbo;
let _addedToGame: GameDbo;

const getGamesAndSeedReviewsForGame01AndUser01 = (doneCb) => {
    getGamesQuery()
        .then((games: GameDbo[]) => {
            _addedToGame = games[0];
            seedReviews(_addedByUser, _addedToGame)
                .then(doneCb)
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

const getUsersAndSeedGamesForUser01 = (doneCb) => {
    getUsersQuery()
        .then((users: UserDbo[]) => {
            _addedByUser = users[0];
            seedGames(_addedByUser)
                .then(() => { getGamesAndSeedReviewsForGame01AndUser01(doneCb) })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const seeder = (doneCb) => {
    Promise.all([deleteAllReviews(), deleteAllGames(), deleteAllUsers()])
        .then(() => {
            seedUsers()
                .then(() => { getUsersAndSeedGamesForUser01(doneCb) })
                .catch((error) => {
                    console.log(error);
                })
        })
        .catch((error) => {
            console.log(error);
        });
};
