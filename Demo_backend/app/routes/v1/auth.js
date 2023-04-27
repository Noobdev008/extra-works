const router = require('express').Router();
// const { validate } = require('uuid');
const controller = require('../../controller/auth');
const { validate, verifyToken, verifyAuthToken } = require('../../middleware');
const schema = require('../../validation/auth');

router.post('/register', validate(schema.register), controller.register)
router.post('/login', validate(schema.login), controller.login);
// router.post('/login', validate(schema.login), controller.login, controller.createSession);
// router.post('/login', controller.login, controller.createSession)
router.post('/send-otp', controller.sendOtp)
router.post('/verify-otp', controller.verifyOtp);
router.post('/logout', verifyAuthToken, controller.logout);

module.exports = router