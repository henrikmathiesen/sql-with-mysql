import { UserDbo } from '../db/dbo/UserDbo';
import { getUsersQuery } from '../db/queries/users/getUsersQuery';
import { deleteUserByIdQuery } from '../db/queries/users/deleteUserByIdQuery';

export const deleteAllUsers = () => {
    return new Promise((resolve, reject) => {
        getUsersQuery()
            .then((users: UserDbo[]) => {
                if (!users) {
                    resolve();
                }
                else {
                    return Promise.all(users.map((user) => {
                        return deleteUserByIdQuery(user.id);
                    }))
                        .then(resolve)
                }
            })
            .catch(reject);
    });
};
