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
        review01.gameId = addedToGame.id;
        review01.userId = addedByUser.id;
        review01.deleted = false;

        const review02 = new ReviewDbo();
        review02.header = 'Great RPG and Great developer';
        review02.body = 'A fantastic world and characters.';
        review02.rating = 10;
        review02.gameId = addedToGame.id;
        review02.userId = addedByUser.id;
        review02.deleted = false;

        reviews.push(review01);
        reviews.push(review02);

        Promise.all(reviews.map(createReviewQuery))
            .then(resolve)
            .catch(reject);
    });
};
