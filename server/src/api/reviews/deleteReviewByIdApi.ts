import * as express from 'express';
import { setAsDeletedEntityByIdQuery } from '../../db/queries/setAsDeletedEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { handleApiError } from '../common/handleApiError';
import { statusCodeConstants } from '../common/statusCodeConstants';
import { getEntityByIdQuery } from '../../db/queries/getEntityByIdQuery';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { calculateGameAvarageRatingBasedOnReviews } from '../calculation/calculateGameAvarageRatingBasedOnReviews';


const router = express.Router();

router.delete('/api/review/:id', (req, res) => {
    const id: number = parseInt(req.params.id);
    let _gameId: number;

    getEntityByIdQuery(DbTableEnum.reviews, id)
        .then((review: ReviewDbo) => {
            if (review) {
                _gameId = review.gameId;
                return setAsDeletedEntityByIdQuery(DbTableEnum.reviews, id);
            }
        })
        .then(() => {
            if(_gameId) {
                return calculateGameAvarageRatingBasedOnReviews(_gameId);
            }
        })
        .then(() => {
            res.sendStatus(statusCodeConstants.noContent);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const deleteReviewByIdApi = router;
