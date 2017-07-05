import { IError } from 'mySql';
import { getDbConnection } from '../common/getSetDbConnection';
import { DbTableEnum, getDbTableConstants } from '../common/getDbTableConstants';
import { EntityDbo } from '../dbo/EntityDbo';

export const createEntityQuery = (tableName: DbTableEnum, entity: EntityDbo): Promise<number> => {
    return new Promise((resolve, reject) => {
        const table = getDbTableConstants(tableName);

        const sql = `
            INSERT INTO ${table} 
            SET ?
        `;

        getDbConnection().query(sql, entity, (error: IError, results) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(results.insertId);
            }
        });
    });
};
