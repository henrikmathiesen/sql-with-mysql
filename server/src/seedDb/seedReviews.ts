import { ReviewDbo } from '../db/dbo/ReviewDbo';
import { GameDbo } from '../db/dbo/GameDbo';
import { UserDbo } from '../db/dbo/UserDbo';
import { createEntityQuery } from '../db/queries/createEntityQuery';
import { DbTableEnum } from '../db/common/getDbTableConstants';

export const seedReviews = (addedByUsers: UserDbo[], addedToGame: GameDbo) => {
    return new Promise((resolve, reject) => {
        const reviews = new Array<ReviewDbo>();

        const review01 = new ReviewDbo();
        review01.header = 'Great RPG';
        review01.body = 'Explore the lands and enjoy.';
        review01.rating = 10;
        review01.gameId = addedToGame.id;
        review01.userId = addedByUsers[0].id;
        review01.deleted = false;

        const review02 = new ReviewDbo();
        review02.header = 'Great RPG and Great developer';
        review02.body = 'A fantastic world and characters.';
        review02.rating = 10;
        review02.gameId = addedToGame.id;
        review02.userId = addedByUsers[1].id;
        review02.deleted = false;

        reviews.push(review01);
        reviews.push(review02);

        Promise.all(reviews.map((review) => {
            createEntityQuery(DbTableEnum.reviews, review);
        }))
            .then(resolve)
            .catch(reject);
    });
};
