import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createUserQuery } from '../../db/queries/users/createUserQuery';
import { UserDbo } from '../../db/dbo/UserDbo';
import { handleApiError } from '../common/handleApiError';
import { getUserIsValid, getUserIsInValidMessage } from '../../validation/getUserIsValid';

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/user', (req, res) => {
    const user: UserDbo = req.body;

    if (!getUserIsValid(user)) {
        handleApiError(req, res, getUserIsInValidMessage);
        return;
    }

    const newUser = new UserDbo();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.registered = new Date(user.registered).toISOString();

    createUserQuery(newUser)
        .then(() => { 
            res.json(newUser);
        })
        .catch((error) => { 
            handleApiError(req, res, error);
        });
});

export const createUserApi = router;
