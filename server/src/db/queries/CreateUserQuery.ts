import * as mySql from 'mysql';
import { DbTableEnum, GetDbTableConstants } from '../common/GetDbTableConstants';
import { GetDbColumnsConstants, IUsersColumnsConstants } from '../common/GetDbColumnsConstants';
import GetSetDbConnection from '../common/GetSetDbConnection';
import User from '../dbo/UserDbo';

export default class CreateUserQuery {
    public query(user: User): mySql.IQuery {

        const userTable = GetDbTableConstants.get(DbTableEnum.users);
        const userColumns = GetDbColumnsConstants.get(DbTableEnum.users) as IUsersColumnsConstants;

        // TODO: should escape values
        // https://www.npmjs.com/package/mysql#escaping-query-values

        const sql = `
            INSERT INTO ${userTable}
            (${userColumns.name}, ${userColumns.email}, ${userColumns.registered})
            VALUES('${user.name}','${user.email}','${user.registered}')
        `;

        const query = GetSetDbConnection.get().query(sql);

        return query;
    }
}
