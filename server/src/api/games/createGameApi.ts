import * as express from 'express';
import * as bodyParser from 'body-parser';
import { GameDbo } from '../../db/dbo/GameDbo';
import { handleApiError } from '../common/handleApiError';
import { getGameIsValid, getGameIsInvalidMessage } from '../validation/getGameIsValid';
import { getUserExists, getUserExistInvalidMessage } from '../validation/getUserExists';
import { createGameQuery } from '../../db/queries/games/createGameQuery';
import { gameBodyToUserMapping } from '../mapping/gameBodyToGameMapping';

const router = express.Router();
router.use(bodyParser.json());

router.post('/api/game', (req, res) => {
    const game: GameDbo = req.body;

    if (!getGameIsValid(game)) {
        handleApiError(req, res, getGameIsInvalidMessage);
        return;
    }

    getUserExists(game.userId)
        .then((userExists: boolean) => {
            if (!userExists) {
                handleApiError(req, res, getUserExistInvalidMessage);
            }
            else {
                const newGame = gameBodyToUserMapping(game);

                createGameQuery(newGame)
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
