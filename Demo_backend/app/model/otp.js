const db = require("../config/database").getUserDB();

const mongoose = require('mongoose')
const otpModel = mongoose.Schema({
  phone_no: {
    type: String,
    required: true
  },
  otp: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    index: {
      expires: process.env.OTP_EXPIRES_IN
    }
  }
})

const Otp = db.model('otps', otpModel)
module.exports = Otp