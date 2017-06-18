import { IConnection } from 'mysql';

let _dbConnection;

export const getDbConnection = (): IConnection => {
    return _dbConnection;
};

export const setDbConnection = (connection: IConnection): void => {
    _dbConnection = connection;
};
