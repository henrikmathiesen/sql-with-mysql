import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { getDbColumnConstants, IReviewsColumnConstants } from '../../db/common/getDbColumnConstants';
import { getEntitiesForEntityByIdQuery } from '../../db/queries/getEntitiesForEntityByIdQuery';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';

export const userHasAlreadyAddedOneReviewForThisGameInvalidMessage = 'User has already added one review for this game';

export const getUserHasAlreadyAddedOneReviewForThisGame = (newReview: ReviewDbo): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const userIdColumn = (getDbColumnConstants(DbTableEnum.reviews) as IReviewsColumnConstants).userId;
        getEntitiesForEntityByIdQuery(DbTableEnum.reviews, userIdColumn, newReview.userId)
            .then((reviews: ReviewDbo[]) => {
                if(!reviews) {
                    resolve(false);
                }
                else {
                    // We could have done this as a SQL query instead, more perfomant
                    const userHasAddedOneReviewForThisGame = reviews.some(review => review.gameId == newReview.gameId);
                    resolve(userHasAddedOneReviewForThisGame);
                }
            })
            .catch((error) => {
                reject(error);
            });
    });
};
