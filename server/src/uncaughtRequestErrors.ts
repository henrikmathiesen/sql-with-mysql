import { handleApiError } from './api/common/handleApiError';

export const uncaughtRequestErrors = (app) => {
    app.use((error, req, res, next) => {
        if (error) {
            handleApiError(req, res, error);
        }
    });
};
