import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnConstants } from '../../common/getDbColumnConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { UserDbo } from '../../dbo/UserDbo';

export const updateUserByIdQuery = (id: number, user: UserDbo) => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.users);
        const columns = getDbColumnConstants(DbTableEnum.users);

        const sql = `
            UPDATE ${table}
            SET ?
            WHERE ${columns.id} = ?
        `;

        getDbConnection().query(sql, [user, id], (error: IError) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
};
