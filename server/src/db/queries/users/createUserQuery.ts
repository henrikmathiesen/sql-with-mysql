import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { UserDbo } from '../../dbo/UserDbo';

export const createUserQuery = (user: UserDbo) => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.users);

        const sql = `
            INSERT INTO ${table} 
            SET ?
        `;

        getDbConnection().query(sql, user, (error: IError) => {
            if (error) {
                reject(error);
            }
            else {
                resolve();
            }
        });
    });
};
