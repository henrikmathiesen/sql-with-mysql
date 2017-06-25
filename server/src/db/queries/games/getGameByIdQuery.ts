import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnConstants } from '../../common/getDbColumnConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { GameDbo } from '../../dbo/GameDbo';

export const getGameById = (id: number): Promise<GameDbo> => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.games);
        const columns = getDbColumnConstants(DbTableEnum.games);

        const sql = `
            SELECT * FROM ${table}
            WHERE ${columns.id} = ?
        `;

        getDbConnection().query(sql, id, (error: IError, games: GameDbo[]) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(games.length ? games[0] : null);
            }
        });
    });
};
