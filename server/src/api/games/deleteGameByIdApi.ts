import * as express from 'express';
import { setAsDeletedEntityByIdQuery } from '../../db/queries/setAsDeletedEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { handleApiError } from '../common/handleApiError';
import { statusCodeConstants } from '../common/statusCodeConstants';

const router = express.Router();

router.delete('/api/game/:id', (req, res) => {
    const id: number = parseInt(req.params.id);

    setAsDeletedEntityByIdQuery(DbTableEnum.games, id)
        .then(() => {
            res.sendStatus(statusCodeConstants.noContent);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const deleteGameByIdApi = router;
