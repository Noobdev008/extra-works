const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Auth Token is not provided');
        error.msg = "Authorization token should be passed inside header",
        error.status = 401
        throw error;
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SUPERKEY);
    } catch (err) {
        const error = new Error('INVALID TOKEN');
        error.msg = "Passed token is invalid",
        error.status = 401
        throw error;
    }

    if (!decodedToken) {
        const error = new Error('AUTHORIZE_FAILED');
        error.msg = "You are not authenticated",
        error.status = 401
        throw error;
    }

    req._id = decodedToken._id;
    req.type = decodedToken.type;
    next();
}

module.exports = {verifyToken}