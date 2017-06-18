import { IError } from 'mySql';
import { getDbConnection } from './common/getSetDbConnection';

export const endDb = (doneCb) => {
    const connection = getDbConnection();

    connection.end((error: IError) => {
        if (error) {
            throw error;
        }
        else {
            doneCb();
        }
    });
};
