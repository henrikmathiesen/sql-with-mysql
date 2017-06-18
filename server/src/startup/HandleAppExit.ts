import { IError } from 'mysql';
import GetSetDbConnection from '../db/common/GetSetDbConnection';

export default class HandleAppExit {
    private static disConnectCb(error: IError): void {
        if (error) {
            throw error;
        }
        else {
            console.log('Disconnected from database');
        }

        console.log('Exiting Program');
        process.exit();
    }

    public static handle(): void {
        // https://nodejs.org/api/process.html#process_signal_events

        process.stdin.resume();

        process.on('SIGINT', function () {
            GetSetDbConnection.get().end(HandleAppExit.disConnectCb);
        });
    }
}
