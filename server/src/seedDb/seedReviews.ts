import { ReviewDbo } from '../db/dbo/ReviewDbo';
import { GameDbo } from '../db/dbo/GameDbo';
import { UserDbo } from '../db/dbo/UserDbo';
import { createReviewQuery } from '../db/queries/reviews/createReviewQuery';

export const seedReviews = (addedByUser: UserDbo, addedToGame: GameDbo) => { 
    return new Promise((resolve, reject) => { 
        const reviews = new Array<ReviewDbo>();

        const review01 = new ReviewDbo();
        review01.header = 'Great RPG';
        review01.body = 'Explore the lands and enjoy.';
        review01.rating = 10;
        review01.deleted = false;
        review01.gameId = addedToGame.id;
        review01.userId = addedByUser.id;

        const review02 = new ReviewDbo();
        review02.header = 'Great RPG and Great developer';
        review02.body = 'A fantastic world and characters.';
        review02.rating = 10;
        review02.deleted = false;
        review02.gameId = addedToGame.id;
        review02.userId = addedByUser.id;

        reviews.push(review01);
        reviews.push(review02);

        Promise.all(reviews.map(createReviewQuery))
            .then(resolve)
            .catch(reject);
    });
};
