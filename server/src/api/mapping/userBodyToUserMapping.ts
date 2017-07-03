import { UserDbo } from '../../db/dbo/UserDbo';

const userBodyToUserMapping = (userBody: UserDbo, isCreated: boolean) => {
    const user = new UserDbo();
    user.name = userBody.name;
    user.email = userBody.email;

    if(isCreated) {
        user.registered = new Date().toISOString();
    }

    user.deleted = false;

    return user;
}; 

export const createdUserBodyToUserMapping = (userBody: UserDbo) => { 
    return userBodyToUserMapping(userBody, true);
};

export const updatedUserBodyToUserMapping = (userBody: UserDbo) => { 
    return userBodyToUserMapping(userBody, false);
};
