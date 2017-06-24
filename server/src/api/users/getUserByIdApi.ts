import * as express from 'express';
import { getUserByIdQuery } from '../../db/queries/users/getUserByIdQuery';
import { UserDbo } from '../../db/dbo/UserDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/user/:id', (req, res) => {
    const id: number = parseInt(req.params.id);

    getUserByIdQuery(id)
        .then((user: UserDbo) => {
            res.json(user);
        })
        .catch((error) => { 
            handleApiError(req, res, error);
        });

});

export const getUserByIdApi = router;
