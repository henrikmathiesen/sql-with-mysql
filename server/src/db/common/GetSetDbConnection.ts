import { IConnection } from 'mysql';

export default class GetSetDbConnection {
    private static _connection: IConnection;

    public static get(): IConnection {
        return GetSetDbConnection._connection;
    }

    public static set(connection: IConnection): void {
        GetSetDbConnection._connection = connection;
    }
}
