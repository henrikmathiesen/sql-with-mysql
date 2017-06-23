import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnsConstants } from '../../common/getDbColumnsConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { GameDbo } from '../../dbo/GameDbo';

export const updateGameQuery = (game: GameDbo, doneCb) => { 
    const table = getDbTableConstants(DbTableEnum.games);
    const columns = getDbColumnsConstants(DbTableEnum.games);

    const sql = `
        UPDATE ${table}
        SET ?
        WHERE ${columns.id} = ?
    `;

    getDbConnection().query(sql, [game, game.id], (error: IError) => {
        if (error) {
            throw error;
        }
        else {
            doneCb();
        }
    });
};
