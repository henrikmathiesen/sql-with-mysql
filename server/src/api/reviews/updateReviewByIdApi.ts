import * as express from 'express';
import * as bodyParser from 'body-parser';
import { EntityDbo } from '../../db/dbo/EntityDbo';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { handleApiError } from '../common/handleApiError';
import { getReviewIsValid, reviewIsInvalidMessage } from '../validation/getReviewIsValid';
import { getEntityExists, entityExistsInvalidMessage } from '../validation/getEntityExists';
import { updateEntityByIdQuery } from '../../db/queries/updateEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { updatedReviewBodyToReviewMapping, IReviewBody } from '../mapping/reviewBodyToReviewMapping';
import { calculateGameAvarageRatingBasedOnReviews } from '../calculation/calculateGameAvarageRatingBasedOnReviews';
import { statusCodeConstants } from '../common/statusCodeConstants';

const router = express.Router();
router.use(bodyParser.json());

router.put('/api/review/:id', (req, res) => {
    const id: number = parseInt(req.params.id);
    const reviewBody: IReviewBody = req.body;
    let reviewCurrent: ReviewDbo;

    if (!getReviewIsValid(reviewBody)) {
        handleApiError(req, res, reviewIsInvalidMessage);
        return;
    }

    getEntityExists(DbTableEnum.reviews, id)
        .then((existingReview: EntityDbo) => {
            if (!existingReview) {
                throw entityExistsInvalidMessage;
            }
            else {
                reviewCurrent = existingReview as ReviewDbo;
                const updatedReview = updatedReviewBodyToReviewMapping(reviewBody);
                return updateEntityByIdQuery(DbTableEnum.reviews, updatedReview, id);
            }
        })
        .then(() => {
            return calculateGameAvarageRatingBasedOnReviews(reviewCurrent.gameId);
        })
        .then(() => {
            res.sendStatus(statusCodeConstants.noContent);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });

});

export const updateReviewByIdApi = router;
