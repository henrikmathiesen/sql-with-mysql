import * as express from 'express';
import * as bodyParser from 'body-parser';
import { GameDbo } from '../../db/dbo/GameDbo';
import { handleApiError } from '../common/handleApiError';
import { getGameIsValid, getGameIsInvalidMessage } from '../validation/getGameIsValid';
import { getEntityExists, getEntityExistsInvalidMessage } from '../validation/getEntityExists';
import { createEntityQuery } from '../../db/queries/createEntityQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { createdGameBodyToGameMapping } from '../mapping/gameBodyToGameMapping';

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/game', (req, res) => {
    const game: GameDbo = req.body;

    if (!getGameIsValid(game)) {
        handleApiError(req, res, getGameIsInvalidMessage);
        return;
    }

    const newGame = createdGameBodyToGameMapping(game);

    getEntityExists(DbTableEnum.users, newGame.userId)
        .then((userExists: boolean) => {
            if (!userExists) {
                handleApiError(req, res, getEntityExistsInvalidMessage);
            }
            else {
                createEntityQuery(DbTableEnum.games, newGame)
                    .then(() => { 
                        res.sendStatus(201);
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

export const createGameApi = router;
