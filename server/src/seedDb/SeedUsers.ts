import * as mySql from 'mysql';
import * as dbConnection from '../dbConnection';
import * as environment from '../environment';
import User from '../dbo/User';

export default class SeedUsers {
    public seed(): void {
        const user01 = new User();
        user01.name = 'John Doe';
        user01.email = 'john@foo.bar';
        user01.registred = new Date();

        const user02 = new User();
        user02.name = 'Jane Poe';
        user02.email = 'jane@foo.bar';
        user02.registred = new Date();

        const users = new Array<User>();
        users.push(user01);
        users.push(user02);

        const connection = mySql.createConnection(dbConnection.config);
        connection.connect();

        const table = environment.tables.users;
        const columns = environment.columns.users;

        for (var i = 0; i < users.length; i++) {
            const sql = `
                INSERT INTO ${table}
                (${columns.name}, ${columns.email}, ${columns.registred})
                VALUES('${users[i].name}','${users[i].email}','${users[i].registred}')
            `;

            if(i == 0) {
                console.log(sql);
            }

            connection.query(sql, (error, results, fields) => {
                if(error) {
                    throw error;
                }
                else {
                    console.log('results', results);
                    console.log('fields', fields);
                }
            });
        }

        connection.end();
    }
}
