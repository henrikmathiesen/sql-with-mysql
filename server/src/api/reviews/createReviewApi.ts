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
import { statusCodeConstants } from '../common/statusCodeConstants';

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/review', (req, res) => {
    const review: IReviewBody = req.body;

    if (!getReviewIsValid(review)) {
        handleApiError(req, res, reviewIsInvalidMessage, true);
        return;
    }

    const newReview = createdReviewBodyToReviewMapping(review);

    Promise.all([
        getEntityExists(DbTableEnum.users, newReview.userId),
        getEntityExists(DbTableEnum.games, newReview.gameId)
    ])
        .then((existingEntities: [EntityDbo]) => {
            const userAndGameExist = existingEntities[0] && existingEntities[1];
            if (!userAndGameExist) {
                throw entityExistsInvalidMessage;
            }
            else {
                return getUserHasAlreadyAddedOneReviewForThisGame(newReview);
            }
        })
        .then((userHasAlreadyAddedOneReviewForThisGame: boolean) => {
            if (userHasAlreadyAddedOneReviewForThisGame) {
                throw userHasAlreadyAddedOneReviewForThisGameInvalidMessage;
            }
            else {
                return createEntityQuery(DbTableEnum.reviews, newReview);
            }
        })
        .then(() => {
            return calculateGameAvarageRatingBasedOnReviews(newReview.gameId);
        })
        .then(() => { 
            res.sendStatus(statusCodeConstants.created);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });

});

export const createReviewApi = router;
