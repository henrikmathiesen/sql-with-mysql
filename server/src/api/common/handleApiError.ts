import { statusCodeConstants } from '../common/statusCodeConstants';
import { isProduction } from '../../environment';

export const handleApiError = (req, res, error) => { 
    const errorInRoute = `Error in route: [${req.method}]${req.path}`;
    const userErrorMessage = isProduction ? errorInRoute : errorInRoute + '\n' + error.stack;
    
    res.status(statusCodeConstants.internalServerError).send(userErrorMessage);
};
