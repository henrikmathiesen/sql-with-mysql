import { IError } from 'mySql';
import { getDbConnection } from '../common/getSetDbConnection';
import { DbTableEnum, getDbTableConstants } from '../common/getDbTableConstants';
import { EntityDbo } from '../dbo/EntityDbo';

export const getEntitiesIncludeSetDeletedQuery = (tableName: DbTableEnum): Promise<EntityDbo[]> => {
    return new Promise((resolve, reject) => {
        const table = getDbTableConstants(tableName);

        const sql = `
            SELECT * FROM ${table}
        `;

        getDbConnection().query(sql, (error: IError, entities: EntityDbo[]) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(entities.length ? entities : null);
            }
        });
    });
}; 
