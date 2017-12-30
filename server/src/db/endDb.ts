import { IError } from 'mySql';
import { getDbConnection } from './common/getSetDbConnection';

export const endDb = (doneCb, errorCb) => {
    const connection = getDbConnection();

    connection.end((error: IError) => {
        if (error) {
            errorCb();
        }
        else {
            doneCb();
        }
    });
};
