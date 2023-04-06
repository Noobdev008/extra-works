const {
    createUser,
    userfindAll,
    userfindByID,
    userUpdate,
    login,
    logout,
    sendOTP,
    verifyOTP,
    search,
    pagination,
    createAdmin,
    // rawQuery,
}=  require('../controller/user.controller')
const {checkToken, isAdmin,isUser} = require('../token_validation/token_validation')
// require('./model/user.model')
const router = require('express').Router();


router.get('/', search)
router.get("/verify/otp",isAdmin, sendOTP);
router.get('/user/',checkToken,isAdmin, userfindAll);
router.get('/user/:id',checkToken, userfindByID);
router.get('/user/page/pg', pagination)


// router.get('/raw', rawQuery);
  


router.post("/verify", verifyOTP);

router.post('/user/create', createUser);
router.post('/admin/create', createAdmin);
router.post('/user/login',checkToken, login);
router.post('/user/user/logout',checkToken, logout);

router.patch('/user/:id',checkToken, userUpdate);



module.exports = router;