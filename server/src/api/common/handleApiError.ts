export const handleApiError = (req, res, error) => { 
    console.log(error);
    res.json(`Error in route: [${req.method}]${req.path}`);
};
