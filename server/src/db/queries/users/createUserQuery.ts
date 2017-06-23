import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { UserDbo } from '../../dbo/UserDbo';

export const createUserQuery = (user: UserDbo, doneCb) => {
    const usersTable = getDbTableConstants(DbTableEnum.users);

    const sql = `INSERT INTO ${usersTable} SET ?`;

    getDbConnection().query(sql, user, (error: IError) => {
        if (error) {
            throw error;
        }
        else {
            doneCb();
        }
    });
};
