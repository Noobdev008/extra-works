const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require('cookie-parser')
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn.js");

app.use(express.json());
app.use(cookieParser())


const whitelist = ["http://localhost:5173"];

// ✅ Enable pre-flight requests
app.options(whitelist, cors());

// const corsOptions = {
//   credentials: true,
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error());
//     }
//   },
// };

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", whitelist);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const PORT = process.env.PORT;

// const User = require("./model/userschema.js");
const Router = require("./router/auth.js");

app.use(Router);

app.listen(PORT, () => {
  console.log("Server listen " + PORT);
});
