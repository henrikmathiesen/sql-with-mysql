import { IError } from 'mySql';
import { DbTableEnum, getDbTableConstants } from '../../common/getDbTableConstants';
import { getDbColumnsConstants } from '../../common/getDbColumnsConstants';
import { getDbConnection } from '../../common/getSetDbConnection';
import { UserDbo } from '../../dbo/UserDbo';

export const getUserByIdQuery = (id: number): Promise<UserDbo> => {
    return new Promise((resolve, reject) => { 
        const table = getDbTableConstants(DbTableEnum.users);
        const columns = getDbColumnsConstants(DbTableEnum.users);

        const sql = `
            SELECT * FROM ${table}
            WHERE ${columns.id} = ?
        `;

        getDbConnection().query(sql, id, (error: IError, users: UserDbo[]) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(users[0]);
            }
        });
    });
};
