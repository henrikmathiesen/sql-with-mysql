import * as express from 'express';
import * as bodyParser from 'body-parser';
import { UserDbo } from '../../db/dbo/UserDbo';
import { handleApiError } from '../common/handleApiError';
import { getUserIsValid, getUserIsInValidMessage } from '../validation/getUserIsValid';
import { createUserQuery } from '../../db/queries/users/createUserQuery';
import { userBodyToUserMapping } from '../mapping/userBodyToUserMapping';

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/user', (req, res) => {
    const user: UserDbo = req.body;

    if (!getUserIsValid(user)) {
        handleApiError(req, res, getUserIsInValidMessage);
        return;
    }

    const newUser = userBodyToUserMapping(user);

    createUserQuery(newUser)
        .then(() => { 
            res.status(201).json(newUser);
        })
        .catch((error) => { 
            handleApiError(req, res, error);
        });
});

export const createUserApi = router;
