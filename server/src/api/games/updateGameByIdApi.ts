import * as express from 'express';
import * as bodyParser from 'body-parser';
import { EntityDbo } from '../../db/dbo/EntityDbo';
import { GameDbo } from '../../db/dbo/GameDbo';
import { handleApiError } from '../common/handleApiError';
import { getGameIsValid, gameIsInvalidMessage } from '../validation/getGameIsValid';
import { getEntityExists, entityExistsInvalidMessage } from '../validation/getEntityExists';
import { updateEntityByIdQuery } from '../../db/queries/updateEntityByIdQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { updatedGameBodyToGameMapping, IGameBody } from '../mapping/gameBodyToGameMapping';

const router = express.Router();
router.use(bodyParser.json());

router.put('/api/game/:id', (req, res) => {
    const id: number = parseInt(req.params.id);
    const game: IGameBody = req.body;

    if (!getGameIsValid(game)) {
        handleApiError(req, res, gameIsInvalidMessage, true);
        return;
    }

    getEntityExists(DbTableEnum.games, id)
        .then((existingGame: EntityDbo) => {
            if (!existingGame) {
                throw entityExistsInvalidMessage;
            }
            else {
                const updatedGame = updatedGameBodyToGameMapping(game);
                return updateEntityByIdQuery(DbTableEnum.games, updatedGame, id);
            }
        })
        .then(() => {
            res.sendStatus(204);
        })
        .catch((error) => {
            handleApiError(req, res, error);
        });
});

export const updateGameByIdApi = router;
