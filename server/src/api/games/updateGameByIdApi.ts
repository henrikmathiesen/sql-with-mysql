import * as express from 'express';
import * as bodyParser from 'body-parser';
import { GameDbo } from '../../db/dbo/GameDbo';
import { handleApiError } from '../common/handleApiError';
import { getGameIsValid, getGameIsInvalidMessage } from '../validation/getGameIsValid';
import { getEntityExists, getEntityExistsInvalidMessage } from '../validation/getEntityExists';
import { updateEntityByIdQuery } from '../../db/queries/updateEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { updatedGameBodyToUserMapping } from '../mapping/gameBodyToGameMapping';

const router = express.Router();
router.use(bodyParser.json());

router.put('/api/game/:id', (req, res) => {
    const id: number = parseInt(req.params.id);
    const game: GameDbo = req.body;

    if (!getGameIsValid(game)) {
        handleApiError(req, res, getGameIsInvalidMessage);
        return;
    }

    getEntityExists(DbTableEnum.games, id)
        .then((gameExists: boolean) => {
            if (!gameExists) {
                handleApiError(req, res, getEntityExistsInvalidMessage);
            }
            else {
                const updatedGame = updatedGameBodyToUserMapping(game);

                updateEntityByIdQuery(DbTableEnum.games, updatedGame, id)
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

export const updateGameByIdApi = router;
