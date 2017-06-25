import * as express from 'express';
import * as bodyParser from 'body-parser';
import { UserDbo } from '../../db/dbo/UserDbo';
import { handleApiError } from '../common/handleApiError';
import { getUserIsValid, getUserIsInValidMessage } from '../validation/getUserIsValid';
import { updateUserByIdQuery } from '../../db/queries/users/updateUserByIdQuery';
import { userBodyToUserMapping } from '../mapping/userBodyToUserMapping';

const router = express.Router();
router.use(bodyParser.json());

router.put('/api/user/:id', (req, res) => {
    const id: number = parseInt(req.params.id);
    const user: UserDbo = req.body;

    if (!getUserIsValid(user)) {
        handleApiError(req, res, getUserIsInValidMessage);
        return;
    }

    const updatedUser = userBodyToUserMapping(user);

    updateUserByIdQuery(id, updatedUser)
        .then(() => { 
            res.status(200).json(updatedUser);
        })
        .catch((error) => { 
            handleApiError(req, res, error);
        });
});

export const updateUserByIdApi = router;
