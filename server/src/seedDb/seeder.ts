import { deleteAllReviews } from './deleteAllReviews';
import { deleteAllGames } from './deleteAllGames';
import { deleteAllUsers } from './deleteAllUsers';

import { seedReviews } from './seedReviews';
import { seedGames } from './seedGames';
import { seedUsers } from './seedUsers';

import { getEntitiesQuery } from '../db/queries/getEntitiesQuery';
import { DbTableEnum } from '../db/common/getDbTableConstants';

import { UserDbo } from '../db/dbo/UserDbo';
import { GameDbo } from '../db/dbo/GameDbo';

let _addedByUser: UserDbo;
let _addedToGame: GameDbo;

const getGamesAndSeedReviewsForGame01AndUser01 = (doneCb) => {
    getEntitiesQuery(DbTableEnum.games)
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
    getEntitiesQuery(DbTableEnum.users)
        .then((users: UserDbo[]) => {
            _addedByUser = users[0];
            seedGames(_addedByUser)
                .then(() => {
                    getGamesAndSeedReviewsForGame01AndUser01(doneCb);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

export const deleter = (doneCb) => {
    Promise.all([deleteAllReviews(), deleteAllGames(), deleteAllUsers()])
        .then(doneCb)
        .catch((error) => {
            console.log(error);
        });
};

export const seeder = (doneCb) => {
    deleter(() => {
        seedUsers()
            .then(() => {
                getUsersAndSeedGamesForUser01(doneCb);
            })
            .catch((error) => {
                console.log(error);
            })
    });
};
