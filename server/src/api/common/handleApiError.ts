export const handleApiError = (req, res, error, showErrorDetailsToUser:boolean = false) => { 
    console.log(error);
    
    const userErrorMessage = (`Error in route: [${req.method}]${req.path}`) + (showErrorDetailsToUser ? ` ${error}` : ``);
    res.status(500).json(userErrorMessage);
};
