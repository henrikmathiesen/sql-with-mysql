import { IUserBody } from '../mapping/userBodyToUserMapping';

export const userIsInValidMessage = 'Invalid user';

export const getUserIsValid = (user: IUserBody) => {
    const nameIsAString = typeof user.name === 'string';
    const emailIsAString = typeof user.email === 'string';

    const nameIsNotEmpty = user.name;
    const emailIsNotEmpty = user.email;

    const hasValidTypes = nameIsAString && emailIsAString;
    const hasNoEmptyValues = nameIsNotEmpty && emailIsNotEmpty;

    return hasValidTypes && hasNoEmptyValues;
};
