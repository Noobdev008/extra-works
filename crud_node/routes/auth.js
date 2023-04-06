const router = require('express').Router();

const authController = require('../controllers/auth');
const { verifyToken } = require('../middlewares/verifyAuth');

router.post(
    '/add',
    verifyToken,
    authController.addAuth
);

router.put(
    '/update',
    verifyToken,
    authController.update
);

module.exports = router;