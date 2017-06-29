import * as express from 'express';
import { getEntitiesQuery } from '../../db/queries/getEntitiesQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { UserDbo } from '../../db/dbo/UserDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/users', (req, res) => {
    getEntitiesQuery(DbTableEnum.users)
        .then((users: UserDbo[]) => { 
            res.json(users);
        })
        .catch((error) => { 
            handleApiError(req, res, error);
        });
});

export const getUsersApi = router;
