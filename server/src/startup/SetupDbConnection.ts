import * as mySql from 'mysql';
import GetDbConnectionConfig from '../db/common/GetDbConnectionConfig';
import GetSetDbConnection from '../db/common/GetSetDbConnection';

export default class SetupDbConnection {
    private static connectCb(error: mySql.IError, connectionDone: any): void {
        if (error) {
            throw error;
        }
        else {
            console.log('connected to database');
            connectionDone();
        }
    }

    public static setup(connectionDone: any): void {
        const connection = mySql.createConnection(GetDbConnectionConfig.get());
        GetSetDbConnection.set(connection);
        
        GetSetDbConnection.get().connect((error: mySql.IError) => {
            SetupDbConnection.connectCb(error, connectionDone);
        });
    }
}
