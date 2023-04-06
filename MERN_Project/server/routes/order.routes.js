const express = require('express');

const router = express.Router();

const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')("sk_test_51LiHuQSHhFc0OYu6a5JU1t8cf6nDajh6G5eN4IIh9sPjX4x68OMYS9lN56hQm7kxt3k3gXv3tn6B24pxdi0779pH00PQZBFvta");
const Order = require('../model/order.model')
const ObjectID = require("mongodb").ObjectID;


router.post('/placeorder', async (req, res) => {
    const { token, subTotal, currentUser, cartItems } = req.body;
    console.log(req.body, "  req body")
    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const payment = await stripe.paymentIntents.create({
            amount: subTotal * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
        }, {
            idempotencyKey: uuidv4(),
        })
        if (payment) {
            const newOrder = new Order({
                name: currentUser.name,
                email: currentUser.email,
                userID: currentUser._id,
                orderItem: cartItems,
                orderAmount: subTotal,
                shippingAddress: {
                    street: token.card.address_line1,
                    city: token.address_city,
                    country: token.address_country,
                    pincode: token.address_zip
                },
                transectionId: payment.source
            })
            newOrder.save()
            res.send("Payment successful")
        } else {
            res.send("Payment fail")
        }
    } catch (error) {
        res.status(400).json({
            message: "Payment failed",
            error: error.stack
        })
    }

})


router.post('/getuserorder', async (req, res) => {
    const { userid } = req.body
    try {
        const orders = await Order.find({ userid }).sort({ _id: '-1' });
        res.status(200).send(orders)
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            err: err.stack
        })
    }
})

router.get('/alluserorder', async (req, res) => {
    const orders = await Order.find({})
    try {

        res.status(200).send(orders)
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            err: err.stack
        })
    }
})

router.post('/deliverorder', async (req, res) => {
    // const { orderid } = req.body.orderid
    // console.log(req.body.orderid, " orderid");
    const orderid = new ObjectID(req.body.orderid);
    // console.log(orderid, " orderid");

    try {
        // let order = await Order.findOne({ _id: orderid })
        let order = await Order.findByIdAndUpdate({ _id: orderid }, { isDeliverd: true }, {
            if(err) {
                res.status(400).json({
                    message: "Something went wrong",
                    err: err.stack
                })
                return
            }
            // res.status(200).send("Order Deliver successfully")
        })
        // order.isDeliverd = true;
        // await order.save();
        console.log(order, " order")
        res.status(200).send("Order Deliver successfully")
    } catch (err) {
        res.status(400).json({
            message: "Something went wrong",
            err: err.stack
        })
    }
})
module.exports = router;