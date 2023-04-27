// const { Schema } = require("mongoose");

const db = require("../config/database").getUserDB();

const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"]
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    match: [/.+\@.+\..+/, "Please enter a valid email"],
    unique: [true, "Email already exists"],
  },
  username: {
    type: String,
    required: [true, "Please enter username"],
    minlength: [6, "Username must be of minimum 6 characters"],
    unique: [true, "Username already exists"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [7, "Password must be of minimum 8 characters"],
  },
  bio: {
    type: String,
    default: "Hi Welcome To My Profile"
  },
  isVarified: {
    type: Boolean,
    default: 0
  },
  otp: {
    type: String,
    index: {
      expires: "1m"
    }
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
)

const Auth = db.model("auths", authSchema);

module.exports = Auth

