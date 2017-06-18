import User from '../db/dbo/UserDbo';
import CreateUserQuery from '../db/queries/CreateUserQuery';

export default class SeedUsers {
    public seed(): void { 
        const user01 = new User();
        user01.name = 'John Doe';
        user01.email = 'john@doe.foo';
        user01.registered = new Date().toISOString();

        const user02 = new User();
        user02.name = 'Jane Poe';
        user02.email = 'jane@poe.bar';
        user02.registered = new Date().toISOString();

        const users = new Array<User>();
        users.push(user01);
        users.push(user02);

        const createUserQuery = new CreateUserQuery();

        // TODO: handle async?

        for(var user = 0; user < users.length; user++) {
            createUserQuery.query(users[user]);
        }
    }
}
