import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { UserDbo } from '../../dbo/UserDbo';

export const getUsersQuery = (): Promise<UserDbo[]> => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.users);

        const sql = `
            SELECT * FROM ${table}
        `;

        getDbConnection().query(sql, (error: IError, users: UserDbo[]) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(users);
            }
        });
    });
};
