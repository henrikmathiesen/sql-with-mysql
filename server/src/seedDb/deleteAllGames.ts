import { GameDbo } from '../db/dbo/GameDbo';
import { getEntitiesIncludeSetDeletedQuery } from '../db/queries/getEntitiesIncludeSetDeletedQuery';
import { deleteEntityByIdQuery } from '../db/queries/deleteEntityByIdQuery';
import { DbTableEnum } from '../db/common/getDbTableConstants';

export const deleteAllGames = () => {
    return new Promise((resolve, reject) => {
        getEntitiesIncludeSetDeletedQuery(DbTableEnum.games)
            .then((games: GameDbo[]) => {
                if (!games) {
                    resolve();
                }
                else {
                    return Promise.all(games.map((game) => {
                        return deleteEntityByIdQuery(DbTableEnum.games, game.id)
                    }))
                        .then(resolve);
                }
            })
            .catch(reject);
    });
};
