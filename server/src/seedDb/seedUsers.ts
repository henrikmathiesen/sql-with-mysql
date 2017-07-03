import { UserDbo } from '../db/dbo/UserDbo';
import { createEntityQuery } from '../db/queries/createEntityQuery';
import { DbTableEnum } from '../db/common/getDbTableConstants';

export const seedUsers = () => {
    return new Promise((resolve, reject) => {
        const users = new Array<UserDbo>();

        const user01 = new UserDbo();
        user01.name = 'Adam Adamsson';
        user01.email = 'adam@adamsson.foo';
        user01.registered = new Date().toISOString();
        user01.deleted = false;

        const user02 = new UserDbo();
        user02.name = 'Bertil Bertilsson';
        user02.email = 'bertil@bertilsson.foo';
        user02.registered = new Date().toISOString();
        user02.deleted = false;

        users.push(user01);
        users.push(user02);

        Promise.all(users.map((user) => { 
            createEntityQuery(DbTableEnum.users, user);
        }))
            .then(resolve)
            .catch(reject);
    });
};
