import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { IUserDbo } from '../../dbo/UserDbo';

export const getUsersQuery = (doneCb) => {
    const usersTable = getDbTableConstants(DbTableEnum.users);

    const sql = `
        SELECT * FROM ${usersTable}
    `;

    getDbConnection().query(sql, (error: IError, users: IUserDbo[]) => { 
        if(error) {
            throw error;
        }
        else {
            doneCb(users);
        }
    });
};
