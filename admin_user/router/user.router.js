const {
    createUser,
    createAdmin,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    userLogout,
    login,
    forgotPassword,
    resetPassword,
}= require('.././controller/user.controller');

const router = require('express').Router();
const {checkToken, isAdmin,isUser} = require('.././token_validation/token_validation')

router.post('/user', createUser);
router.post('/admin', createAdmin);
router.post('/user/login', login);
router.post('/user/users/forgotpassword/', forgotPassword);
router.post('/user/users/resetpassword/', resetPassword);
router.get('/user',checkToken,isAdmin, getUser);
router.get('/user/:id',checkToken, getUserById);
router.get('/user/users/logout',userLogout)
router.put('/user',checkToken, updateUser);
router.delete('/user', deleteUser);


module.exports = router;