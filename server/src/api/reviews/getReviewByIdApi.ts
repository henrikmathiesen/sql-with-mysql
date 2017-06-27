import * as express from 'express';
import { getReviewByIdQuery } from '../../db/queries/reviews/getReviewByIdQuery';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/review/:id', (req, res) => {
    const id: number = parseInt(req.params.id);

    getReviewByIdQuery(id)
        .then((review: ReviewDbo) => { 
            res.json(review);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const getReviewByIdApi = router;
