import * as mySql from 'mysql';
import * as dbConnection from './db/common/dbConnection';
import * as setGetConnection from './db/common/setGetConnection';

const dbConnectCb = (error: mySql.IError) => {
    if(error) {
        console.log(JSON.stringify(error));
    }
    else {
        console.log('Connected to database');
    }
};

const dbDisConnectCb = (error: mySql.IError) => {
    if(error) {
        console.log(JSON.stringify(error));
    }
    else {
        console.log('Disconnected from database');
    }
};

export const setUpDbConnection = () => {
    const connection = mySql.createConnection(dbConnection.config);
    setGetConnection.setConnection(connection);
    setGetConnection.getConnection().connect(dbConnectCb);
};

export const handleAppExit = () => {
    // https://nodejs.org/api/process.html#process_signal_events
    
    process.stdin.resume();

    process.on('SIGINT', function () {
        console.log('EXITING PROGRAM');
        setGetConnection.getConnection().end(dbDisConnectCb);
        process.exit();
    });
};
