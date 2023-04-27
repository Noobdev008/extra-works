const mongoose = require("mongoose");

const db = require("../config/database").getUserDB();

const sessionSchema = new mongoose.Schema({
  auth_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth"
  },
  // device_id: {
  //   type: String
  // },
  // device_token: {
  //   type: String
  // },
  // device_type: {
  //   type: String
  // },
  jwt_token: {
    type: String
  }

},
  {
    timestamps: true,
    versionKey: false
  }
)



const Session = db.model("sessions", sessionSchema);

module.exports =
  Session 