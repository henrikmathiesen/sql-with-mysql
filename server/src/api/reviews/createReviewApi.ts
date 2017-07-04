import * as express from 'express';
import * as bodyParser from 'body-parser';
import { EntityDbo } from '../../db/dbo/EntityDbo';
import { handleApiError } from '../common/handleApiError';
import { getReviewIsValid, reviewIsInvalidMessage } from '../validation/getReviewIsValid';
import { getEntityExists, entityExistsInvalidMessage } from '../validation/getEntityExists';
import { getUserHasAlreadyAddedOneReviewForThisGame, userHasAlreadyAddedOneReviewForThisGameInvalidMessage } from '../validation/getUserHasAlreadyAddedOneReviewForThisGame';
import { createEntityQuery } from '../../db/queries/createEntityQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { createdReviewBodyToReviewMapping, IReviewBody } from '../mapping/reviewBodyToReviewMapping';
import { calculateGameAvarageRatingBasedOnReviews } from '../calculation/calculateGameAvarageRatingBasedOnReviews';

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/review', (req, res) => {
    const review: IReviewBody = req.body;

    if (!getReviewIsValid(review)) {
        handleApiError(req, res, reviewIsInvalidMessage, true);
        return;
    }

    const newReview = createdReviewBodyToReviewMapping(review);

    const createReviewAndCalculateGameAvarageRating = () => {
        createEntityQuery(DbTableEnum.reviews, newReview)
            .then(() => {
                calculateGameAvarageRatingBasedOnReviews(newReview.gameId)
                    .then(() => {
                        res.sendStatus(201);
                    })
                    .catch((error) => {
                        handleApiError(req, res, error);
                    });
            })
            .catch((error) => {
                handleApiError(req, res, error);
            });
    };

    Promise.all([
        getEntityExists(DbTableEnum.users, newReview.userId),
        getEntityExists(DbTableEnum.games, newReview.gameId)
    ])
        .then((existingEntities: [EntityDbo]) => {
            const userAndGameExist = existingEntities[0] && existingEntities[1];
            if (!userAndGameExist) {
                handleApiError(req, res, entityExistsInvalidMessage, true);
            }
            else {
                getUserHasAlreadyAddedOneReviewForThisGame(newReview)
                    .then((userHasAlreadyAddedOneReviewForThisGame: boolean) => {
                        if (userHasAlreadyAddedOneReviewForThisGame) {
                            handleApiError(req, res, userHasAlreadyAddedOneReviewForThisGameInvalidMessage, true);
                            return;
                        }
                        else {
                            createReviewAndCalculateGameAvarageRating();
                        }
                    })
                    .catch((error) => {
                        handleApiError(req, res, error);
                    });
            }
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });

});

export const createReviewApi = router;
