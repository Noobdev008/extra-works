const jwt = require('jsonwebtoken')
const response = require('../response/index')
const httpStatus = require('http-status')
const commonService = require('../services/common')
const model = require('../model/index')
const { env } = require('../constant/environment')
const constant = require('../constant/auth')



//This function is used for validate API key

exports.verifyApiKey = (req, res, next) => {
    try {
        let ApiKey = req.headers["x-api-key"];
        console.log(ApiKey);
        if (!ApiKey) {
            return response.error(req, res, { msgCode: 'MISSING_API_KEY' }, httpStatus.UNAUTHORIZED);
        }

        if (ApiKey != env.API_KEY) {
            return response.error(req, res, { msgCode: 'INVALID_API_KEY' }, httpStatus.UNAUTHORIZED)

        }
        return next();
    } catch (error) {
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG)

    }
}



// This function is used for generate jwt token

exports.generateAuthJwt = (payload) => {

    const { expires_in, ...params } = payload;
    const token = jwt.sign(params, env.SECRET_KEY, { expiresIn: expires_in });
    if (!token) {
        return false;
    }
    return token;
};

exports.verifyAuthToken = (req, res, next) => {
    try {
        let token = req.headers["authorization"];
        if (!token) {
            return response.error(req, res, { msgCode: 'MISSING_TOKEN' }, httpStatus.UNAUTHORIZED);
        }
        token = token.replace(/^Bearer\s+/, "")

        jwt.verify(token, env.SECRET_KEY, async (error, decoded) => {
            if (error) {
                let msgCode = "INVALID_TOKEN"
                if (error.message == constant.error_msg.EXPIRED) {
                    msgCode = 'TOKEN_EXPIRED'
                }
                return response.error(req, res, { msgCode }, httpStatus)
            }
            const sessionModel = model.Session
            const condition = { jwt_token: token }
            const checkJwt = await commonService.getByCondition(sessionModel, condition)
            if (!checkJwt) {
                return response.error(req, res, { msgCode: 'INVALID_TOKEN' }, httpStatus.UNAUTHORIZED)
            }
            else {
                req.data = decoded;
                return next();
            }
        });
    }
    catch (err) {
        console.log(err);
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG)
    }
};

// function to verify user type you can change it  

exports.isCompany = (req, res, next) => {
    try {
        const jwtData = req.data;
        if (jwtData.user_type !== constant.user_type.COMPANY) {
            return response.success(req, res, { msgCode: 'UNAUTHORIZED' }, httpStatus.UNAUTHORIZED);
        }
        else {
            req.data = jwtData;
            return next();
        }
    }
    catch (err) {
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG)

    }
};


exports.isAdmin = (req, res, next) => {
    try {
        // check role
        const jwtData = req.data;
        if (jwtData.user_type !== constant.user_type.ADMIN) {
            return response.success(req, res, { msgCode: 'UNAUTHORIZED' }, httpStatus.UNAUTHORIZED);
        }
        else {
            req.data = jwtData;
            return next();
        }
    }
    catch (err) {
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG)

    }
};

exports.verifyToken = (req, res, next) => {
    try {
        let token = req.headers.token
        if (!token) {
            return response.error(req, res, { msgCode: 'MISSING_TOKEN' }, httpStatus.UNAUTHORIZED);
        }
        jwt.verify(token, env.SECRET_KEY, async (error, decoded) => {
            console.log(error);
            if (error) {
                let msgCode = "INVALID_TOKEN"
                if (error.message == constant.error_msg.EXPIRED) {
                    msgCode = 'TOKEN_EXPIRED'
                }
                return response.error(req, res, { msgCode }, httpStatus.UNAUTHORIZED)
            }
            req.token = decoded;
            return next();
        })
    } catch (err) {
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG)

    }
}
