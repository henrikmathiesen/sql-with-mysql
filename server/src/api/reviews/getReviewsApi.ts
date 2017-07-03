import * as express from 'express';
import { getEntitiesQuery } from '../../db/queries/getEntitiesQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/reviews', (req, res) => {
    getEntitiesQuery(DbTableEnum.reviews)
        .then((reviews: ReviewDbo[]) => {
            res.json(reviews);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const getReviewsApi = router;
