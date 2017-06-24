import * as express from 'express';
import { getUsersQuery } from '../../db/queries/users/getUsersQuery';
import { UserDbo } from '../../db/dbo/UserDbo';

const router = express.Router();

router.get('/api/users', (req, res) => {
    getUsersQuery()
        .then((users: UserDbo[]) => { 
            res.json(users);
            res.end();
        })
        .catch((error) => { 
            console.log(error);
            res.json('Error in ' + req.route);
        });
});

export const getUsersApi = router;
