import * as express from 'express';
import * as bodyParser from 'body-parser';
import { EntityDbo } from '../../db/dbo/EntityDbo';
import { UserDbo } from '../../db/dbo/UserDbo';
import { handleApiError } from '../common/handleApiError';
import { getUserIsValid, userIsInValidMessage } from '../validation/getUserIsValid';
import { getEntityExists, entityExistsInvalidMessage } from '../validation/getEntityExists';
import { updateEntityByIdQuery } from '../../db/queries/updateEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { updatedUserBodyToUserMapping, IUserBody } from '../mapping/userBodyToUserMapping';
import { statusCodeConstants } from '../common/statusCodeConstants';

const router = express.Router();
router.use(bodyParser.json());

router.put('/api/user/:id', (req, res) => {
    const id: number = parseInt(req.params.id);
    const user: IUserBody = req.body;

    if (!getUserIsValid(user)) {
        handleApiError(req, res, userIsInValidMessage);
        return;
    }

    getEntityExists(DbTableEnum.users, id)
        .then((existingUser: EntityDbo) => {
            if (!existingUser) {
                throw entityExistsInvalidMessage;
            }
            else {
                const updatedUser = updatedUserBodyToUserMapping(user);
                return updateEntityByIdQuery(DbTableEnum.users, updatedUser, id);
            }
        })
        .then(() => { 
            res.sendStatus(statusCodeConstants.noContent);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const updateUserByIdApi = router;
