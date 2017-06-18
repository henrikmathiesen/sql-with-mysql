import * as mySql from 'mysql';

let _connection: mySql.IConnection;

export const getConnection = ():mySql.IConnection => {
    return _connection;
};

export const setConnection = (connection: mySql.IConnection) => {
    _connection = connection;
};
