// const { Pay } = require('twilio/lib/twiml/VoiceResponse');
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
    payment,
    paymentDone,
    rozorPay,
    // rawQuery,
}=  require('../controller/user.controller')
const {checkToken, isAdmin,isUser} = require('../token_validation/token_validation')
// require('./model/user.model')
const router = require('express').Router();


router.get('/', (req,res)=>res.send("hi"))
router.get("/verify/otp", sendOTP);
router.get('/user/', userfindAll);
router.get('/user/:id',checkToken, userfindByID);
router.get('/user/payment/payment', payment);


// router.get('/raw', rawQuery);
  


router.post("/verify", verifyOTP);

router.post('/user/create', createUser);
router.post('/user/login',checkToken, login);
router.post('/user/user/logout',checkToken, logout);

router.patch('/user/:id',checkToken, userUpdate);
router.post("/user/payment/payment/paymentDone", paymentDone);




module.exports = router;