export const getApiErrorMessage = (req) => { 
    return `Error in route: [${req.method}]${req.path}`;
};
