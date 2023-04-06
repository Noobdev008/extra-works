const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
let db = require('../db/db.config')

const Payments = db.payment
const instance = new Razorpay({
    key_id: 'rzp_test_dwYLdYz0fm779c',
    key_secret: 'Hixt0B6KAQ9rwgQ7MC4gf0Pf'
});
let orderNumber;

router.get('/', (req, res) => {
    console.log(req.body, " get");
    var options = {
        amount: 600,
        currency: 'INR',
    };
    instance.orders.create(options, async function (err, order) {
        if (err) {
            console.log(err);
        } else {
            console.log(order, "order");
            // orderNumber = order.id;

            res.render('./checkout.ejs', { amount: order.amount, order_id: order.id });
        }
    });
});


router.post('/pay-verify', async (req, res) => {
    console.log(req.body, "body");
    console.log(orderNumber, "orderNumber");
let pid = req.body.razorpay_payment_id;
orderNumber  = req.body.razorpay_order_id
    body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'Hixt0B6KAQ9rwgQ7MC4gf0Pf')
        .update(body.toString())
        .digest('hex');
    // console.log("sig"+req.body.razorpay_signature);
    // console.log("sig"+expectedSignature);

    let sign = req.body.razorpay_signature
    if (expectedSignature === req.body.razorpay_signature) {

        let data = await Payments.create({ orderid: orderNumber, rsignature:sign , rpaymentid:pid ,payment :6,success:1 })
        console.log(data, 'data0');
        console.log("Payment Success");
    } else {
        console.log("Payment Fail");
    }
})

module.exports = router;
