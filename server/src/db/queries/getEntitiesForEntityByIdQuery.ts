import { IError } from 'mySql';
import { getDbConnection } from '../common/getSetDbConnection';
import { DbTableEnum, getDbTableConstants } from '../common/getDbTableConstants';
import { getDbColumnConstants } from '../common/getDbColumnConstants';
import { EntityDbo } from '../dbo/EntityDbo';

export const getEntitiesForEntityByIdQuery = (tableName: DbTableEnum, foreignKeyColumn:string, id: number): Promise<EntityDbo[]> => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(tableName);
        const columns = getDbColumnConstants(tableName);

        const sql = `
            SELECT * FROM ${table}
            WHERE ${foreignKeyColumn} = ? AND ${columns.deleted} = ?
        `;

        getDbConnection().query(sql, [id, false], (error: IError, entities: EntityDbo[]) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(entities.length ? entities : null);
            }
        });
    });
};
