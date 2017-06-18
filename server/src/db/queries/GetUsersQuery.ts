import * as mySql from 'mysql';
import { DbTableEnum, GetDbTableConstants } from '../common/GetDbTableConstants';
import GetSetDbConnection from '../common/GetSetDbConnection';

export default class GetUsersQuery {
    public query(): mySql.IQuery {

       const userTable = GetDbTableConstants.get(DbTableEnum.users);

        const sql = `
            SELECT * from ${userTable}
        `;

        const query = GetSetDbConnection.get().query(sql);

        return query;
    }
}
