import * as mySql from 'mysql';
import * as dbConnection from '../dbConnection';
import * as tableConstants from '../tableConstants';
import User from '../dbo/UserDbo';

export default class CreateUserQuery {
    public query(user: User): void {

        const connection = mySql.createConnection(dbConnection.config);
        connection.connect();

        const table = tableConstants.tables.users;
        const columns = tableConstants.columns.users;

        // TODO: should escape values

        const sql = `
                INSERT INTO ${table}
                (${columns.name}, ${columns.email}, ${columns.registered})
                VALUES('${user.name}','${user.email}','${user.registered}')
            `;

        connection.query(sql, (error, results, fields) => {
            if (error) {
                throw error;
            }
            else {
                console.log('results', results);
                console.log('fields', fields);
            }
        });

        connection.end();

    }
}
