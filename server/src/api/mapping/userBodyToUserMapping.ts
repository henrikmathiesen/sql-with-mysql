import { UserDbo } from '../../db/dbo/UserDbo';

export const userBodyToUserMapping = (userBody: UserDbo) => { 
    const user = new UserDbo();
    user.name = userBody.name;
    user.email = userBody.email;
    user.registered = new Date().toISOString();
    user.deleted = false;

    return user;
};
