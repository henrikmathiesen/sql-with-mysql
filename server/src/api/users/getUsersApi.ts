import * as express from 'express';
import { getUsersQuery } from '../../db/queries/users/getUsersQuery';
import { UserDbo } from '../../db/dbo/UserDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/users', (req, res) => {
    getUsersQuery()
        .then((users: UserDbo[]) => {
            res.sendStatus(200).json(users);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const getUsersApi = router;
