import { IError } from 'mySql';
import { getDbConnection } from '../common/getSetDbConnection';
import { DbTableEnum, getDbTableConstants } from '../common/getDbTableConstants';
import { getDbColumnConstants } from '../common/getDbColumnConstants';

export const setAsDeletedEntityByIdQuery = (tableName: DbTableEnum, id: number) => {
    return new Promise((resolve, reject) => {
        const table = getDbTableConstants(tableName);
        const columns = getDbColumnConstants(tableName);

        const sql = `
            UPDATE ${table}
            SET ${columns.deleted} = ?
            WHERE ${columns.id} = ?
        `;

        getDbConnection().query(sql, [true, id], (error: IError) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    })
};
