import * as express from 'express';
import { deleteGameByIdQuery } from '../../db/queries/games/deleteGameByIdQuery';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.delete('/api/game/:id', (req, res) => {
    const id: number = parseInt(req.params.id);

    deleteGameByIdQuery(id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const deleteGameByIdApi = router;
