import { UserDbo } from '../../db/dbo/UserDbo';
import * as moment from 'moment';

export const getUserIsInValidMessage = 'Invalid user';

export const getUserIsValid = (user: UserDbo) => {
    const nameIsAString = typeof user.name === 'string';
    const emailIsAString = typeof user.email === 'string';
    const registeredIsAnIso8601Date = moment(user.registered, moment.ISO_8601, true).isValid();

    const nameIsNotEmpty = user.name;
    const emailIsNotEmpty = user.email;
    

    return nameIsAString &&
        emailIsAString &&
        registeredIsAnIso8601Date &&
        nameIsNotEmpty &&
        emailIsNotEmpty;
};
