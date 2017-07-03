import * as express from 'express';
import { getEntitiesForEntityByIdQuery } from '../../db/queries/getEntitiesForEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { getDbColumnConstants, IGamesColumnConstants } from '../../db/common/getDbColumnConstants';
import { GameDbo } from '../../db/dbo/GameDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/user/:id/games', (req, res) => {
    const id: number = parseInt(req.params.id);

    const userIdColumn = (getDbColumnConstants(DbTableEnum.games) as IGamesColumnConstants).userId;
    getEntitiesForEntityByIdQuery(DbTableEnum.games, userIdColumn, id)
        .then((games: GameDbo[]) => {
            res.json(games);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const getGamesForUserByIdApi = router;
