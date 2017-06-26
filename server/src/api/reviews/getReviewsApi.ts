import * as express from 'express';
import { getReviewsQuery } from '../../db/queries/reviews/getReviewsQuery';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/reviews', (req, res) => {
    getReviewsQuery()
        .then((reviews: ReviewDbo[]) => {
            res.json(reviews);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const getReviewsApi = router;
