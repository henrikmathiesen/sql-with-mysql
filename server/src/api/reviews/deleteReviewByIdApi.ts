import * as express from 'express';
import { deleteReviewByIdQuery } from '../../db/queries/reviews/deleteReviewByIdQuery';
import { ReviewDbo } from '../../db/dbo/ReviewDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.delete('/api/review/:id', (req, res) => {
    const id: number = parseInt(req.params.id);

    deleteReviewByIdQuery(id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const deleteReviewByIdApi = router;
