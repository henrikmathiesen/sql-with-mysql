import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { GameDbo } from '../../dbo/GameDbo';

export const getGamesQuery = (): Promise<GameDbo[]> => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.games);

        const sql = `
            SELECT * FROM ${table}
        `;

        getDbConnection().query(sql, (error: IError, games: GameDbo[]) => { 
            if(error) {
                reject(error);
            }
            else {
                resolve(games);
            }
        });
    });
};
