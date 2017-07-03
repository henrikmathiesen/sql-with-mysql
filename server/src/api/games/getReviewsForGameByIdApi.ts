import * as express from 'express';
import { getEntitiesForEntityByIdQuery } from '../../db/queries/getEntitiesForEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { getDbColumnConstants, IReviewsColumnConstants } from '../../db/common/getDbColumnConstants';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/game/:id/reviews', (req, res) => { 
    const id: number = parseInt(req.params.id);

    const gameIdColumn = (getDbColumnConstants(DbTableEnum.reviews) as IReviewsColumnConstants).gameId;
    getEntitiesForEntityByIdQuery(DbTableEnum.reviews, gameIdColumn, id)
        .then((reviews: ReviewDbo[]) => {
            res.json(reviews);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const getReviewsForGameByIdApi = router;
