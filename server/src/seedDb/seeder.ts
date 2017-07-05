import { deleter } from './deleter';

import { seedReviews } from './seedReviews';
import { seedGames } from './seedGames';
import { seedUsers } from './seedUsers';

import { getEntitiesQuery } from '../db/queries/getEntitiesQuery';
import { DbTableEnum } from '../db/common/getDbTableConstants';

import { UserDbo } from '../db/dbo/UserDbo';
import { GameDbo } from '../db/dbo/GameDbo';

let _addedByUsers: UserDbo[];

export const seeder = (doneCb) => {
    deleter(() => {
        seedUsers()
            .then(() => {
                return getEntitiesQuery(DbTableEnum.users);
            })
            .then((users: UserDbo[]) => {
                _addedByUsers = users;
                return seedGames(_addedByUsers);
            })
            .then(() => {
                return getEntitiesQuery(DbTableEnum.games);
            })
            .then((games: GameDbo[]) => { 
                return seedReviews(_addedByUsers, games[0]);
            })
            .then(doneCb)
            .catch((error) => {
                console.log(error);
            })
    });
};
