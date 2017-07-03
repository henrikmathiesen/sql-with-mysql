import * as express from 'express';
import { getEntityByIdQuery } from '../../db/queries/getEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/review/:id', (req, res) => {
    const id: number = parseInt(req.params.id);

    getEntityByIdQuery(DbTableEnum.reviews, id)
        .then((review: ReviewDbo) => { 
            res.json(review);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const getReviewByIdApi = router;
