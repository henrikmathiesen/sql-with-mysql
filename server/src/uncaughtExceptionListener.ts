import { endDb } from './db/endDb';

export const uncaughtExceptionListener = (onEndCb) => {
    process.once('uncaughtException', (error) => {
        endDb(() => { 
            onEndCb(error);
        });
    });
};
