const response = require('../response/index');
const authJwt = require('../middleware')
const httpStatus = require('http-status')
const passwordHash = require('../utils/password');
const helper = require('../utils/helper');
const db = require("../config/database").getUserDB();
const model = require('../model/index')
const commonService = require('../services/common');
const { env } = require('../constant/environment')

exports.register = async (req, res, next) => {

  try {
    req.body.password = await passwordHash.generateHash(req.body.password, +(env.SALT_ROUND))

    // console.log(req.body.password," password");
    let { name, email, username, password } = req.body;
    // emailValidate= email
    const { Auth } = model
    let condition = { name, email, username, password }
    req.body.JWT = authJwt.generateAuthJwt({ email: email, expires_in: env.TOKEN_EXPIRES_IN });
    // console.log(req.body.JWT);

    const createUser = await commonService.create(Auth, condition)
    // console.log(createUser)
    if (!createUser) {
      return response.error(req, res, {
        msgCode: 'INVALID_CREDENTIALS'
      }, httpStatus.UNAUTHORIZED);
    }
    return response.success(req, res, { msgCode: 'SIGNUP_SUCCESSFUL' }, httpStatus.CREATED)
  }
  catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);

  }
}


exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;
    let condition = { email };
    const { Auth, Session } = model
    // const session = await db.startSession().startTransaction();
    // await session.startTransaction();
    const checkUser = await commonService.getByCondition(Auth, condition)
    // console.log(checkUser);
    if (!checkUser) {
      return response.error(req, res, { msgCode: 'INVALID_CREDENTIALS' }, httpStatus.UNAUTHORIZED);
    }
    const isLogin = passwordHash.comparePassword(req.body.password, checkUser.password);
    if (!isLogin) {
      return response.error(req, res, {
        msgCode: 'INVALID_CREDENTIALS'
      }, httpStatus.UNAUTHORIZED);
    }
    //For block user
    if (checkUser.status == '0') {
      return response.error({ msgCode: 'BLOCK_MSG' }, res, httpStatus.UNAUTHORIZED);
    }
    //For maximum login limitations

    const totalLogin = await commonService.count(Session, { auth_id: checkUser.id })
    if (totalLogin > (env.MAX_LOGIN_DEVICE * 1)) {
      return response.error({ msgCode: 'TOTAL_LOGIN' }, res, httpStatus.UNAUTHORIZED);
    }
    const { password, ...resultData } = checkUser;
    // console.log(checkUser, " checking user")
    // console.log(resultData)
    resultData.token = authJwt.generateAuthJwt({
      id: checkUser._id,
      expires_in: env.TOKEN_EXPIRES_IN,
      email,
      // device_id
    });
    // console.log(resultData.token )
    if (!resultData.token) {
      return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
    }

    req.loginData = {
      // device_details: { device_id, device_token, device_type },
      auth_details: resultData,
    };
    // console.log( req.loginData, " req..")
    // return next();
    return response.success(req, res, { msgCode: 'LOGIN_SUCCESSFUL' }, httpStatus.ACCEPTED)
  }
  catch (err) {
    console.log(err, " err");
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }

};

exports.createSession = async (req, res) => {
  try {
    const { device_id, device_token, device_type } = req.loginData.device_details;
    const condition = { device_id };
    const sessionModel = model.Session
    const checkSession = await commonService.getByCondition(sessionModel, condition)
    if (checkSession) {
      const destroySession = await commonService.removeById(sessionModel, checkSession._id)
      if (!destroySession) {
        return response.error(req, res, { msgCode: helper.getErrorMsgCode(req) }, httpStatus.FORBIDDEN);
      }
    }
    const sessionData = {
      auth_id: req.loginData.auth_details._id,
      device_id,
      device_token,
      device_type,
      jwt_token: req.loginData.auth_details.token
    };

    console.log('sessionData', sessionData);
    const createSession = await commonService.create(sessionModel, sessionData)
    if (!createSession) {
      return response.error(req, res, { msgCode: helper.getErrorMsgCode(req) }, httpStatus.FORBIDDEN);
    }

    const { ...data } = req.loginData.auth_details;
    let msgCode = helper.getSuccessMsgCode(req);
    return response.success(req, res, { msgCode, data }, httpStatus.OK);
  }
  catch (err) {
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

exports.sendOtp = async (req, res) => {
  try {

    const OtpModel = model.Otp;
    const { phone_no } = req.body
    const otp = helper.generateOtp(env.OTP_DIGIT)
    const hashOtp = await passwordHash.generateHash(otp)
    const otpData = {
      phone_no,
      otp: hashOtp
    }
    const condition = { phone_no }
    const checkOtp = await commonService.getByCondition(OtpModel, condition)
    if (checkOtp) {
      const deleteData = await commonService.deleteByField(OtpModel, condition)
      if (!deleteData) {
        return response.error(req, res, { msgCode: 'OTP_NOT_SEND' }, httpStatus.FORBIDDEN);
      }
    }
    const createOtpDetails = await commonService.create(OtpModel, otpData)
    if (!createOtpDetails) {
      return response.error(req, res, { msgCode: 'OTP_NOT_SEND' }, httpStatus.FORBIDDEN);
    }
    const msgCode = 'OTP_SENT'
    return response.success(req, res, { msgCode, data: { otp: otp } }, httpStatus.OK);

  } catch (err) {
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);

  }
}

exports.verifyOtp = async (req, res) => {
  try {

    const OtpModel = model.Otp;
    const { phone_no, otp } = req.body
    const condition = { phone_no }
    const details = await commonService.getByCondition(OtpModel, condition)

    if (!details) {
      return response.error(req, res, { msgCode: 'OTP_EXPIRED' }, httpStatus.UNAUTHORIZED);
    }
    const check = passwordHash.comparePassword(otp, details.otp)
    console.log("🚀 ~ file: auth.js ~ line 143 ~ exports.verifyOtp= ~ check", check)
    if (!check) {
      return response.error(req, res, { msgCode: 'INVALID_OTP' }, httpStatus.UNAUTHORIZED);
    }
    const deleteOtp = await commonService.deleteByField(OtpModel, condition)
    if (!deleteOtp) {
      return response.error(req, res, { msgCode: 'EMAIL_v_FAILED' }, httpStatus.FORBIDDEN);

    }
    const msgCode = 'EMAIL_VERIFIED'
    return response.success(req, res, { msgCode }, httpStatus.ACCEPTED);

  } catch (error) {
    console.log(error);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);

  }
}

exports.resetPassword = async (req, res) => {
  try {
    const authModel = model.Auth
    const { new_password } = req.body;
    const { ...tokenData } = req.token
    if (!tokenData.is_verified) {
      return response.error(req, res, { msgCode: 'INVALID_TOKEN' }, httpStatus.UNAUTHORIZED);
    }
    const updateCondition = { email: tokenData.email };
    const hashPassword = await passwordHash.generateHash(new_password);

    const data = {
      password: hashPassword
    };
    const updateUser = await commonService.updateByCondition(authModel, data, updateCondition)
    if (updateUser.modifiedCount == 0) {
      return response.error(req, res, { msgCode: 'UPDATE_ERROR' }, httpStatus.FORBIDDEN);
    }
    return response.success(req, res, { msgCode: 'PASSWORD_UPDATED' }, httpStatus.CREATED);
  }
  catch (error) {
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);

  }
};

// this function is used for check email is exist or not if exist it returns already registered


exports.isEmailExist = async (req, res, next) => {
  try {
    const authModel = model.Auth
    const { email } = req.body;
    const condition = { email: email.toLowerCase() };
    const checkUserExist = await commonService.getByCondition(authModel, condition)
    if (!checkUserExist) {
      return next();
    }
    return response.error(req, res, { msgCode: 'ALREADY_REGISTERED' }, httpStatus.CONFLICT);
  }
  catch (err) {
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};

// this function is used for check phone no is exist or not if exist it returns already registered

exports.isPhoneExist = async (req, res, next) => {
  try {
    const authModel = model.Auth
    const { country_code, phone_no } = req.body
    const condition = { country_code, phone_no }
    const checkPhone = await commonService.getByCondition(authModel, condition)
    if (!checkPhone) { return next() }
    return response.error(req, res, { msgCode: 'ALREADY_REGISTERED' }, httpStatus.CONFLICT);
  } catch (error) {
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);

  }
}

// this function is used for check email is exist or not if not it return unauthorized

exports.isUserExist = async (req, res, next) => {
  try {
    const authModel = model.Auth
    const { email } = req.body;
    const condition = { email: email.toLowerCase() };
    const checkUserExist = await commonService.getByCondition(authModel, condition)
    if (!checkUserExist) {
      return response.error(req, res, { msgCode: 'UNAUTHORIZED' }, httpStatus.UNAUTHORIZED);
    }
    return next();
  }
  catch (err) {
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);

  }
};



exports.changePassword = async (req, res) => {

  try {
    const { ...tokenData } = req.data
    // Below we require model
    const { Auth, Session } = db.sequelize.models;

    const { new_password, old_password, logout } = req.body
    const condition = { _id: tokenData.id }
    const userDetails = await commonService.getByCondition(Auth, condition)
    if (!userDetails) {
      return response.error(req, res, { msgCode: 'UPDATE_ERROR' }, httpStatus.FORBIDDEN);

    }
    // check old password is correct or not
    const check = passwordHash.comparePassword(old_password, userDetails.password)
    if (!check) {

      // await dbTrans.rollback();
      return response.error(req, res, { msgCode: 'WRONG_PASS' }, httpStatus.UNAUTHORIZED);
    }
    const hashPassword = await passwordHash.generateHash(new_password);
    const data = {
      password: hashPassword
    };
    const updateUser = await commonService.updateByCondition(Auth, data, condition)
    if (!updateUser) {
      // await dbTrans.rollback();
      return response.error(req, res, { msgCode: 'UPDATE_ERROR' }, httpStatus.FORBIDDEN);
    }

    // if user want to logout all other device than pass logout true

    if (logout) {
      const sessionCondition = {
        [Op.and]: [{ auth_id: tokenData.id }, { device_id: { [Op.ne]: tokenData.device_id } }]
      }
      await commonService.deleteQuery(Session, sessionCondition, dbTrans, true)
    }

    // await dbTrans.commit();
    return response.success(req, res, { msgCode: 'PASSWORD_UPDATED' }, httpStatus.OK);

  } catch (error) {
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);

  }
}

exports.logout = async (req, res) => {

  try {
    // auth id and device id we get from token
    const condition = {
      auth_id: req.data.id,
      device_id: req.data.device_id
    };
    const sessionModel = model.Session
    const destroySession = await commonService.deleteByField(sessionModel, condition)
    if (!destroySession) {
      return response.error(req, res, { msgCode: 'USER_NOT_FOUND' }, httpStatus.SOMETHING_WRONG);
    }
    return response.success(req, res, { msgCode: 'LOGOUT_SUCCESSFUL' }, httpStatus.OK);
  }
  catch (err) {
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.SOMETHING_WRONG);
  }
};


