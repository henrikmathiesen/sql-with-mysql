import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { IUserDbo } from '../../dbo/UserDbo';

export const getUserByIdQuery = (id: number, doneCb) => {
    const usersTable = getDbTableConstants(DbTableEnum.users);
    const escapedId = getDbConnection().escape(id);

    const sql = `
        SELECT * FROM ${usersTable}
        WHERE id = ${escapedId}
    `;

    getDbConnection().query(sql, (error: IError, user: IUserDbo) => {
        if (error) {
            throw error;
        }
        else {
            doneCb(user);
        }
    });
};
