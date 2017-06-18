import { IConnection } from 'mysql';

let _dbConnection;

const getDbConnection = (): IConnection => {
    return _dbConnection;
};

const setDbConnection = (connection: IConnection): void => {
    _dbConnection = connection;
};
