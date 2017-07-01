import * as express from 'express';
import { getEntityByIdQuery } from '../../db/queries/getEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { GameDbo } from '../../db/dbo/GameDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/game/:id', (req, res) => {
    const id: number = parseInt(req.params.id);

    getEntityByIdQuery(DbTableEnum.games, id)
        .then((game: GameDbo) => {
            res.json(game);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });

});

export const getGameByIdApi = router;
