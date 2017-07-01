import * as express from 'express';
import { getEntitiesQuery } from '../../db/queries/getEntitiesQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { GameDbo } from '../../db/dbo/GameDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/games', (req, res) => {
    getEntitiesQuery(DbTableEnum.games)
        .then((games: GameDbo[]) => {
            res.json(games);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const getGamesApi = router;
