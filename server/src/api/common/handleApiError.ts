import { statusCodeConstants } from '../common/statusCodeConstants';
import { isProduction } from '../../environment';

// In production mode, send no stacktrace but send custom error message. In development mode, send both.

const getErrorIsCustomError = (error: any) => { 
    return typeof error === 'string';
};

export const handleApiError = (req, res, error) => {
    const errorInRoute = `Error in route: [${req.method}]${req.path}`;
    const userErrorMessage = isProduction && !getErrorIsCustomError(error) ? errorInRoute : (errorInRoute + '\n') + (error.stack || error);
    res.status(statusCodeConstants.internalServerError).send(userErrorMessage);
};
