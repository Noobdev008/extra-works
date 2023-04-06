const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'order name required'],
    },
    email: {
        type: String,
        required: [true, 'order email required'],
    },
    userID: {
        type: String,
        // required: [true, 'user id required'],
    },
    orderItem: [],
    shippingAddress: [],
    orderAmount: {
        type: String,
        // required: true
    },
    isDeliverd: {
        type: Boolean,
       default: false,
    },
    transectionId: {
        type: String,
        // required: true
    }
}, { timestamps: true });

const orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;
