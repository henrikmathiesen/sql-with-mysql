import * as mySql from 'mysql';
import * as dbConnection from '../common/dbConnection';
import * as tableConstants from '../common/tableConstants';
import User from '../dbo/UserDbo';

export default class CreateUserQuery {
    public query(user: User): mySql.IQuery {

        const connection = mySql.createConnection(dbConnection.config);

        const userTable = tableConstants.tables.users;
        const userColumns = tableConstants.columns.users;

        // TODO: should escape values
        // https://www.npmjs.com/package/mysql#escaping-query-values

        const sql = `
            INSERT INTO ${userTable}
            (${userColumns.name}, ${userColumns.email}, ${userColumns.registered})
            VALUES('${user.name}','${user.email}','${user.registered}')
        `;

        const query = connection.query(sql);

        connection.end();

        return query;

    }
}
