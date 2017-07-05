import { statusCodeConstants } from '../common/statusCodeConstants';

export const handleApiError = (req, res, error) => { 
    console.log(error);
    
    const userErrorMessage = `Error in route: [${req.method}]${req.path}`;
    res.status(statusCodeConstants.internalServerError).json(userErrorMessage);
};
