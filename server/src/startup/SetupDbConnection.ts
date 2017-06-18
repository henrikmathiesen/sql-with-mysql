import * as mySql from 'mysql';
import GetDbConnectionConfig from '../db/common/GetDbConnectionConfig';
import GetSetDbConnection from '../db/common/GetSetDbConnection';

export default class SetupDbConnection {
    private static connectCb(error: mySql.IError): void {
        if (error) {
            throw error;
        }
        else {
            console.log('connected to database');
        }
    }

    public static setup(): void {
        const connection = mySql.createConnection(GetDbConnectionConfig.get());
        GetSetDbConnection.set(connection);
        GetSetDbConnection.get().connect(SetupDbConnection.connectCb);
    }
}
