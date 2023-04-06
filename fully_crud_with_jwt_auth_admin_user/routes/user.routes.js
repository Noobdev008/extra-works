const {
    userRegistration,
    login,
    logout,
    findAll,
    findOne,
    userUpdate,
    sentOtp,
    verifyOTP,
} = require('../controllers/user.controller');

const {checkToken,isAdmin,isUser} = require('../token_validation/token_validation')

const router = require('express').Router();

router.get("/verify/otp",isAdmin, sentOtp);
router.get('/user/logout', logout);
router.get('/user/findall/finduser', checkToken,isAdmin,findAll);
router.get('/user/findone/finduser/:id', findOne);



router.post("/verify", verifyOTP);

router.post('/user',userRegistration);
router.post('/user/login',login);
router.post('/user/update/userupdate',userUpdate);


module.exports = router;