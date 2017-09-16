import { endDb } from './db/endDb';

// https://nodejs.org/api/process.html#process_event_uncaughtexception

export const uncaughtExceptionListener = (onEndCb) => {
    process.once('uncaughtException', (error) => {
        endDb(() => { 
            onEndCb(error);
        });
    });
};
