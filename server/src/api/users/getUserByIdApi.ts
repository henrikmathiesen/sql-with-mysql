import * as express from 'express';
import { getEntityByIdQuery } from '../../db/queries/getEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { UserDbo } from '../../db/dbo/UserDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/user/:id', (req, res) => {
    const id: number = parseInt(req.params.id);

    getEntityByIdQuery(DbTableEnum.users, id)
        .then((user: UserDbo) => {
            res.json(user);
        })
        .catch((error) => { 
            handleApiError(req, res, error);
        });

});

export const getUserByIdApi = router;
