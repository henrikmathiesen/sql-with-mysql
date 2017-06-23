import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnsConstants } from '../../common/getDbColumnsConstants';
import { getDbConnection } from '../../common/getSetDbConnection';

export const deleteUserByIdQuery = (id: number) => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.users);
        const columns = getDbColumnsConstants(DbTableEnum.users);

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
