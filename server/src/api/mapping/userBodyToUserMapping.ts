import { UserDbo } from '../../db/dbo/UserDbo';

export interface IUserBody {
    name:string;
    email:string;
}

const userBodyToUserMapping = (userBody: IUserBody, isCreated: boolean) => {
    const user = new UserDbo();
    user.name = userBody.name;
    user.email = userBody.email;

    if(isCreated) {
        user.registered = new Date().toISOString();
    }

    user.deleted = false;

    return user;
}; 

export const createdUserBodyToUserMapping = (userBody: IUserBody) => { 
    return userBodyToUserMapping(userBody, true);
};

export const updatedUserBodyToUserMapping = (userBody: IUserBody) => { 
    return userBodyToUserMapping(userBody, false);
};
