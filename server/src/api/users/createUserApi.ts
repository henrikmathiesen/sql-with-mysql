import * as express from 'express';
import * as bodyParser from 'body-parser';
import { UserDbo } from '../../db/dbo/UserDbo';
import { handleApiError } from '../common/handleApiError';
import { getUserIsValid, userIsInValidMessage } from '../validation/getUserIsValid';
import { createEntityQuery } from '../../db/queries/createEntityQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { createdUserBodyToUserMapping, IUserBody } from '../mapping/userBodyToUserMapping';
import { statusCodeConstants } from '../common/statusCodeConstants';
import { responseHeaderConstants } from '../common/responseHeaderConstants';

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/user', (req, res) => {
    const user: IUserBody = req.body;

    if (!getUserIsValid(user)) {
        handleApiError(req, res, userIsInValidMessage, true);
        return;
    }

    const newUser = createdUserBodyToUserMapping(user);

    createEntityQuery(DbTableEnum.users, newUser)
        .then((insertId: number) => {
            res.set(responseHeaderConstants.id, insertId.toString());
            res.sendStatus(statusCodeConstants.created);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const createUserApi = router;
