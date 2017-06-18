import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { IGameDbo } from '../../dbo/GameDbo';

export const getGamesQuery = (doneCb) => {
    const gamesTable = getDbTableConstants(DbTableEnum.games);

    const sql = `
        SELECT * FROM ${gamesTable}
    `;

    getDbConnection().query(sql, (error: IError, games: IGameDbo[]) => { 
        if(error) {
            throw error;
        }
        else {
            doneCb(games);
        }
    });
};
