import { GameDbo } from '../db/dbo/GameDbo';
import { getGamesQuery } from '../db/queries/games/getGamesQuery';
import { deleteGameByIdQuery } from '../db/queries/games/deleteGameByIdQuery';

export const deleteAllGames = () => {
    return new Promise((resolve, reject) => {
        getGamesQuery()
            .then((games: GameDbo[]) => {
                return Promise.all(games.map((game) => {
                    return deleteGameByIdQuery(game.id)
                }))
                    .then(resolve);
            })
            .catch(reject);
    });
};
