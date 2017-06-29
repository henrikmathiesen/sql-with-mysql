import { IError } from 'mySql';
import { getDbConnection } from '../common/getSetDbConnection';
import { DbTableEnum, getDbTableConstants } from '../common/getDbTableConstants';
import { getDbColumnConstants } from '../common/getDbColumnConstants';

export const deleteEntityByIdQuery = (tableName: DbTableEnum, id: number) => {
    return new Promise((resolve, reject) => {
        const table = getDbTableConstants(tableName);
        const columns = getDbColumnConstants(tableName);

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
