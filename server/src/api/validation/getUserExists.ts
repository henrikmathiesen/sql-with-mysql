import { UserDbo } from '../../db/dbo/UserDbo';
import { getUserByIdQuery } from '../../db/queries/users/getUserByIdQuery';

export const getUserExistInvalidMessage = 'User does not exist';

export const getUserExist = (id: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        getUserByIdQuery(id)
            .then((user: UserDbo) => { 
                const userExists = user ? true : false;
                resolve(userExists);
            })
            .catch((error) => { 
                reject(error);
            });
    });
};
