import * as express from 'express';
import * as bodyParser from 'body-parser';
import { GameDbo } from '../../db/dbo/GameDbo';
import { handleApiError } from '../common/handleApiError';
import { getGameIsValid, gameIsInvalidMessage } from '../validation/getGameIsValid';
import { getEntityExists, entityExistsInvalidMessage } from '../validation/getEntityExists';
import { createEntityQuery } from '../../db/queries/createEntityQuery';
import { DbTableEnum } from '../../db/common/getDbTableConstants';
import { createdGameBodyToGameMapping, IGameBody } from '../mapping/gameBodyToGameMapping';

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/game', (req, res) => {
    const game: IGameBody = req.body;

    if (!getGameIsValid(game)) {
        handleApiError(req, res, gameIsInvalidMessage);
        return;
    }

    const newGame = createdGameBodyToGameMapping(game);

    getEntityExists(DbTableEnum.users, newGame.userId)
        .then((userExists: boolean) => {
            if (!userExists) {
                handleApiError(req, res, entityExistsInvalidMessage);
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
