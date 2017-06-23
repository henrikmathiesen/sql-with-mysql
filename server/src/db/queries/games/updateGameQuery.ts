import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnConstants } from '../../common/getDbColumnConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { GameDbo } from '../../dbo/GameDbo';

export const updateGameQuery = (game: GameDbo) => { 
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.games);
        const columns = getDbColumnConstants(DbTableEnum.games);

        const sql = `
            UPDATE ${table}
            SET ?
            WHERE ${columns.id} = ?
        `;

        getDbConnection().query(sql, [game, game.id], (error: IError) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
};
