import { UserDbo } from '../db/dbo/UserDbo';
import { getEntitiesIncludeSetDeletedQuery } from '../db/queries/getEntitiesIncludeSetDeletedQuery';
import { deleteEntityByIdQuery } from '../db/queries/deleteEntityByIdQuery';
import { DbTableEnum } from '../db/common/getDbTableConstants';

export const deleteAllUsers = () => {
    return new Promise((resolve, reject) => {
        getEntitiesIncludeSetDeletedQuery(DbTableEnum.users)
            .then((users: UserDbo[]) => {
                if (!users) {
                    resolve();
                }
                else {
                    return Promise.all(users.map((user) => {
                        return deleteEntityByIdQuery(DbTableEnum.users, user.id);
                    }))
                        .then(resolve)
                }
            })
            .catch(reject);
    });
};
