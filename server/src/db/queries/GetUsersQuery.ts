import * as mySql from 'mysql';
import * as dbConnection from '../common/dbConnection';
import * as tableConstants from '../common/tableConstants';
import User from '../dbo/UserDbo';

export default class GetUsersQuery {
    public query(): mySql.IQuery {

        const connection = mySql.createConnection(dbConnection.config);

        const userTable = tableConstants.tables.users;

        const sql = `
            SELECT * from ${userTable}
        `;

        const query = connection.query(sql);

        connection.end();

        return query;
    }
}
