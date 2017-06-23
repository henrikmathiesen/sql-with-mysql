import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { GameDbo } from '../../dbo/GameDbo';

export const createGameQuery = (game: GameDbo, doneCb) => { 
    const table = getDbTableConstants(DbTableEnum.games);

    const sql = `
        INSERT INTO ${table} 
        SET ?
    `;

    getDbConnection().query(sql, game, (error: IError) => {
        if (error) {
            throw error;
        }
        else {
            doneCb();
        }
    });
};
