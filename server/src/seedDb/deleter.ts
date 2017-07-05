import { deleteAllReviews } from './deleteAllReviews';
import { deleteAllGames } from './deleteAllGames';
import { deleteAllUsers } from './deleteAllUsers';

export const deleter = (doneCb) => {
    Promise.all([deleteAllReviews(), deleteAllGames(), deleteAllUsers()])
        .then(doneCb)
        .catch((error) => {
            console.log(error);
        });
};
