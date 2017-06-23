import { UserDbo } from '../db/dbo/UserDbo';
import { createUserQuery } from '../db/queries/users/createUserQuery';

export const seedUsers = () => {

    return new Promise((resolve, reject) => { 
        const users = new Array<UserDbo>();

        const user01 = new UserDbo();
        user01.name = 'Adam Adamsson';
        user01.email = 'adam@adamsson.foo';
        user01.registered = new Date().toISOString();

        const user02 = new UserDbo();
        user02.name = 'Bertil Bertilsson';
        user02.email = 'bertil@bertilsson.foo';
        user02.registered = new Date().toISOString();

        const user03 = new UserDbo();
        user03.name = 'John Doe';
        user03.email = 'john@doe.foo';
        user03.registered = new Date().toISOString();

        const user04 = new UserDbo();
        user04.name = 'Jane Poe';
        user04.email = 'jane@poe.foo';
        user04.registered = new Date().toISOString();

        users.push(user01);
        users.push(user02);
        users.push(user03);
        users.push(user04);

        Promise.all(users.map(createUserQuery))
            .then(resolve)
            .catch(reject);

    });
};
