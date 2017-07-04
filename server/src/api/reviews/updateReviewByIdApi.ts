import * as express from 'express';
import * as bodyParser from 'body-parser';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { handleApiError } from '../common/handleApiError';
import { getReviewIsValid, reviewIsInvalidMessage } from '../validation/getReviewIsValid';
import { getEntityExists, entityExistsInvalidMessage } from '../validation/getEntityExists';
import { updateEntityByIdQuery } from '../../db/queries/updateEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { updatedReviewBodyToReviewMapping, IReviewBody } from '../mapping/reviewBodyToReviewMapping';
import { calculateGameAvarageRatingBasedOnReviews } from '../calculation/calculateGameAvarageRatingBasedOnReviews';

const router = express.Router();
router.use(bodyParser.json());

router.put('/api/review/:id', (req, res) => {
    const id: number = parseInt(req.params.id);
    const review: IReviewBody = req.body;

    if (!getReviewIsValid(review)) {
        handleApiError(req, res, reviewIsInvalidMessage);
        return;
    }

    getEntityExists(DbTableEnum.reviews, id)
        .then((reviewExists: boolean) => {
            if (!reviewExists) {
                handleApiError(req, res, entityExistsInvalidMessage);
            }
            else {
                const updatedReview = updatedReviewBodyToReviewMapping(review);

                updateEntityByIdQuery(DbTableEnum.reviews, updatedReview, id)
                    .then(() => {
                        calculateGameAvarageRatingBasedOnReviews(updatedReview.gameId)
                            .then(() => {
                                res.end();
                            })
                            .catch((error) => {
                                handleApiError(req, res, error);
                            });
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

const updateReviewByIdApi = router;
