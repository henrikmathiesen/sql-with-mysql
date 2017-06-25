import * as express from 'express';
import { getGamesQuery } from '../../db/queries/games/getGamesQuery';
import { GameDbo } from '../../db/dbo/GameDbo';
import { handleApiError } from '../common/handleApiError';

const router = express.Router();

router.get('/api/games', (req, res) => {
    getGamesQuery()
        .then((games: GameDbo[]) => {
            res.json(games);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const getGamesApi = router;
