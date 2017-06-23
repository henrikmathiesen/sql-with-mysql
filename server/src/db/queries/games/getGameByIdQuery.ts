import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { GameDbo } from '../../dbo/GameDbo';

export const getGameById = (id: number, doneCb) => {
    const gamesTable = getDbTableConstants(DbTableEnum.games);
    const escapedId = getDbConnection().escape(id);

    const sql = `
        SELECT * FROM ${gamesTable}
        WHERE id = ${escapedId}
    `;

    getDbConnection().query(sql, (error: IError, game: GameDbo) => {
        if (error) {
            throw error;
        }
        else {
            doneCb(game);
        }
    });
};
