const router = require('express').Router();

const userController = require('../controllers/user');
const {verifyToken} = require('../middlewares/verifyAuth');

router.post(
    '/register',
    userController.register
);

router.post(
    '/login',
    userController.login
);

router.get(
    '/get',
    verifyToken,
    userController.getUser
);

router.put(
    '/update',
    verifyToken,
    userController.updateUser
);

router.delete(
    '/delete',
    verifyToken,
    userController.deleteUser
);

router.post(
    '/reset-password',
    verifyToken,
    userController.resetPassword
);

router.post(
    '/forget-password',
    userController.forgetPassword
);

module.exports = router;