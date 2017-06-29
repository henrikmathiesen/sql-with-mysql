import { IError } from 'mySql';
import { getDbConnection } from '../common/getSetDbConnection';
import { DbTableEnum, getDbTableConstants } from '../common/getDbTableConstants';
import { getDbColumnConstants } from '../common/getDbColumnConstants';
import { EntityDbo } from '../dbo/EntityDbo';

export const updateEntityByIdQuery = (tableName: DbTableEnum, entity: EntityDbo, id: number) => {
    return new Promise((resolve, reject) => {
        const table = getDbTableConstants(tableName);
        const columns = getDbColumnConstants(tableName);

        const sql = `
            UPDATE ${table}
            SET ?
            WHERE ${columns.id} = ?
        `;

        getDbConnection().query(sql, [entity, id], (error: IError) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
};
