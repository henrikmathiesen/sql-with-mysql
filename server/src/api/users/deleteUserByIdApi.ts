import * as express from 'express';
import { deleteUserByIdQuery } from '../../db/queries/users/deleteUserByIdQuery';
import { UserDbo } from '../../db/dbo/UserDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.delete('/api/user/:id', (req, res) => {
    const id: number = parseInt(req.params.id);

    deleteUserByIdQuery(id)
        .then(() => {
            res.sendStatus(204);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const deleteUserByIdApi = router;
