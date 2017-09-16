import { statusCodeConstants } from '../common/statusCodeConstants';
import { environment, environmentsConstants } from '../../environment';

const errorIsCustomError = (error: any) => {
    return typeof error === 'string';
};

export const handleApiError = (req, res, error) => {
    const errorInRoute = `Error in route: [${req.method}]${req.path}`;
    let errorMessage = '';

    if (errorIsCustomError(error)) {
        errorMessage = (errorInRoute + '\n') + error;
    }
    else if (environment === environmentsConstants.production) {
        errorMessage = errorInRoute;
    }
    else {
        errorMessage = (errorInRoute + '\n') + error.stack;
    }

    res.status(statusCodeConstants.internalServerError).send(errorMessage);
};
