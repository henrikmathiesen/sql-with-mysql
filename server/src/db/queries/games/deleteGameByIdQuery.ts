import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnConstants } from '../../common/getDbColumnConstants';
import { getDbConnection } from '../../common/getSetDbConnection';

export const deleteGameByIdQuery = (id: number) => { 
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.games);
        const columns = getDbColumnConstants(DbTableEnum.games);

        const sql = `
            DELETE FROM ${table}
            WHERE ${columns.id} = ?
        `;

        getDbConnection().query(sql, id, (error: IError) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
};
