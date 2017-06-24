import { deleteAllReviews } from './deleteAllReviews';
import { deleteAllGames } from './deleteAllGames';
import { deleteAllUsers } from './deleteAllUsers';
import { seedReviews } from './seedReviews';
import { seedGames } from './seedGames';
import { seedUsers } from './seedUsers';

export const seeder = () => {
    Promise.all([deleteAllReviews(), deleteAllGames(), deleteAllUsers()])
        .then((values) => { 
            console.log('all deleted', values);
        })
        .catch((error) => { 
            console.log('seeder error', error);
        });
};
