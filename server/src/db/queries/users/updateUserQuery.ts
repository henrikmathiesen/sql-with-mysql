import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnsConstants } from '../../common/getDbColumnsConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { UserDbo } from '../../dbo/UserDbo';

export const updateUserQuery = (user: UserDbo, doneCb) => {
    const table = getDbTableConstants(DbTableEnum.users);
    const columns = getDbColumnsConstants(DbTableEnum.users);

    const sql = `
        UPDATE ${table}
        SET ?
        WHERE ${columns.id} = ?
    `;

    getDbConnection().query(sql, [user, user.id], (error: IError) => {
        if (error) {
            throw error;
        }
        else {
            doneCb();
        }
    });
};
