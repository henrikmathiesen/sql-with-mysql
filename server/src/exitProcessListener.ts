import { endDb } from './db/endDb';

export const exitProcessListener = (onEndCb) => {
    // https://nodejs.org/api/process.html#process_signal_events
    process.stdin.resume();
    process.on('SIGINT', () => {
        endDb(onEndCb);
    });
};
