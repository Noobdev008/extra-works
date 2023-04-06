const  {
    payment,
    paymentDone
} = require('../controller/stripe.controller' )


const router = require('express').Router();


router.get('/stripe',payment)
router.post("/payment", paymentDone);

module.exports = router;    