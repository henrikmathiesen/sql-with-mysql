import { deleter } from './deleter';

import { seedReviews } from './seedReviews';
import { seedGames } from './seedGames';
import { seedUsers } from './seedUsers';

import { getEntitiesQuery } from '../db/queries/getEntitiesQuery';
import { DbTableEnum } from '../db/common/getDbTableConstants';

import { UserDbo } from '../db/dbo/UserDbo';
import { GameDbo } from '../db/dbo/GameDbo';

let _addedByUser: UserDbo;
let _addedToGame: GameDbo;
let _doneCb;

export const seeder = (doneCb) => {
    _doneCb = doneCb;
    deleter(() => {
        seedUsers()
            .then(() => {
                return getEntitiesQuery(DbTableEnum.users);
            })
            .then((users: UserDbo[]) => {
                _addedByUser = users[0];
                return seedGames(_addedByUser);
            })
            .then(() => {
                return getEntitiesQuery(DbTableEnum.games);
            })
            .then((games: GameDbo[]) => { 
                _addedToGame = games[0];
                return seedReviews(_addedByUser, _addedToGame);
            })
            .then(_doneCb)
            .catch((error) => {
                console.log(error);
            })
    });
};
