import { getEntitiesForEntityByIdQuery } from '../../db/queries/getEntitiesForEntityByIdQuery';
import { getEntityByIdQuery } from '../../db/queries/getEntityByIdQuery';
import { updateEntityByIdQuery } from '../../db/queries/updateEntityByIdQuery';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { GameDbo } from '../../db/dbo/GameDbo';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { getDbColumnConstants, IReviewsColumnConstants } from '../../db/common/getDbColumnConstants';

export const calculateGameAvarageRatingBasedOnReviews = (gameId: number) => {
    return new Promise((resolve, reject) => {
        const gameIdColumn = (getDbColumnConstants(DbTableEnum.reviews) as IReviewsColumnConstants).gameId;
        let gameAvarageRating = 0;

        getEntitiesForEntityByIdQuery(DbTableEnum.reviews, gameIdColumn, gameId)
            .then((reviews: ReviewDbo[]) => {
                for (let review = 0; review < reviews.length; review++) {
                    gameAvarageRating += reviews[review].rating;
                }

                gameAvarageRating = gameAvarageRating / reviews.length;
                gameAvarageRating = Math.round(gameAvarageRating);

                return getEntityByIdQuery(DbTableEnum.games, gameId);
            })
            .then((game: GameDbo) => {
                game.avarageRating = gameAvarageRating;
                return updateEntityByIdQuery(DbTableEnum.games, game, gameId);
            })
            .then(resolve)
            .catch(reject);
    });
};
