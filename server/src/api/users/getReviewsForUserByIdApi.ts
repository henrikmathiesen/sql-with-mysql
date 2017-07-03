import * as express from 'express';
import { getEntitiesForEntityByIdQuery } from '../../db/queries/getEntitiesForEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { getDbColumnConstants, IReviewsColumnConstants } from '../../db/common/getDbColumnConstants';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/user/:id/reviews', (req, res) => { 
    const id: number = parseInt(req.params.id);

    const userIdColumn = (getDbColumnConstants(DbTableEnum.reviews) as IReviewsColumnConstants).userId;
    getEntitiesForEntityByIdQuery(DbTableEnum.reviews, userIdColumn, id)
        .then((reviews: ReviewDbo[]) => {
            res.json(reviews);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const getReviewsForUserByIdApi = router;
