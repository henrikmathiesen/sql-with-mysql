import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnConstants } from '../../common/getDbColumnConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { UserDbo } from '../../dbo/UserDbo';

export const getUserByIdQuery = (id: number): Promise<UserDbo> => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.users);
        const columns = getDbColumnConstants(DbTableEnum.users);

        const sql = `
            SELECT * FROM ${table}
            WHERE ${columns.id} = ?
        `;

        getDbConnection().query(sql, id, (error: IError, users: UserDbo[]) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(users.length ? users[0] : null);
            }
        });
    });
};
