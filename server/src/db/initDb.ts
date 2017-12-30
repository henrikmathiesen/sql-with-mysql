import * as mySql from 'mySql';
import { getDbConnectionConfig } from './common/getDbConnectionConfig';
import { setDbConnection } from './common/getSetDbConnection';

export const initDb = (doneCb, errorCb) => {
    const connection = mySql.createConnection(getDbConnectionConfig());
    setDbConnection(connection);

    connection.connect((error: mySql.IError) => { 
        if(error) {
            errorCb();
        }
        else {
            doneCb();
        }
    });
};
