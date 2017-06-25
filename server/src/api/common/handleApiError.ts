export const handleApiError = (req, res, error) => { 
    console.log(error);
    res.status(500).json(`Error in route: [${req.method}]${req.path}`);
};
