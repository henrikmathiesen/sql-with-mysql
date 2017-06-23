import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnsConstants } from '../../common/getDbColumnsConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { GameDbo } from '../../dbo/GameDbo';

export const getGameById = (id: number, doneCb) => {
    const table = getDbTableConstants(DbTableEnum.games);
    const columns = getDbColumnsConstants(DbTableEnum.games);

    const sql = `
        SELECT * FROM ${table}
        WHERE ${columns.id} = ?
    `;

    getDbConnection().query(sql, id, (error: IError, games: GameDbo[]) => {
        if (error) {
            throw error;
        }
        else {
            doneCb(games[0]);
        }
    });
};
