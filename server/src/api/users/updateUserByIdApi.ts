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
                handleApiError(req, res, entityExistsInvalidMessage);
            }
            else {
                const updatedUser = updatedUserBodyToUserMapping(user);

                updateEntityByIdQuery(DbTableEnum.users, updatedUser, id)
                    .then(() => {
                        res.end();
                    })
                    .catch((error) => {
                        handleApiError(req, res, error);
                    });
            }
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const updateUserByIdApi = router;
