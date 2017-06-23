import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { UserDbo } from '../../dbo/UserDbo';

export const getUserByIdQuery = (id: number, doneCb) => {
    const usersTable = getDbTableConstants(DbTableEnum.users);

    const sql = `
        SELECT * FROM ${usersTable}
        WHERE id = ?
    `;

    getDbConnection().query(sql, [id], (error: IError, user: UserDbo) => {
        if (error) {
            throw error;
        }
        else {
            doneCb(user);
        }
    });
};
