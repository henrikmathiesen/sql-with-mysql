import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { handleApiError } from '../common/handleApiError';
import { getReviewIsValid, reviewIsInvalidMessage } from '../validation/getReviewIsValid';
import { getEntityExists, entityExistsInvalidMessage } from '../validation/getEntityExists';
import { createEntityQuery } from '../../db/queries/createEntityQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { createdReviewBodyToReviewMapping, IReviewBody } from '../mapping/reviewBodyToReviewMapping';

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/review', (req, res) => {
    const review: IReviewBody = req.body;

    if (!getReviewIsValid(review)) {
        handleApiError(req, res, reviewIsInvalidMessage);
        return;
    }

    const newReview = createdReviewBodyToReviewMapping(review);

    Promise.all([
        getEntityExists(DbTableEnum.users, newReview.userId),
        getEntityExists(DbTableEnum.games, newReview.gameId)
    ])
        .then((entitiesExist: [boolean]) => {
            const userAndGameExist = entitiesExist[0] && entitiesExist[1];
            if (!userAndGameExist) {
                handleApiError(req, res, entityExistsInvalidMessage);
            }
            else {
                createEntityQuery(DbTableEnum.reviews, newReview)
                    .then(() => {
                        // TODO: calculate game avarage rating
                        res.sendStatus(201);
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
