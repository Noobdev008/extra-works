const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

require("../db/conn.js");
const User = require("../model/userschema.js");
const authenticate = require("../middleware/authenticate.js");

// const User = RE

router.get("/", (req, res) => {
  res.send("hi router");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, work, address, password, cpassword } = req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !work ||
    !address ||
    !password ||
    !cpassword
  ) {
    res.send("Please fill the filed properly");
  }
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.send({ error: "Data Already Registered!!" });
    }
    const user = new User({
      name,
      email,
      phone,
      work,
      address,
      password,
      cpassword,
    });

    const userCreated = await user.save();
    if (userCreated) {
      return res.status(201).json({ message: "Register Successfull !" });
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

router.post("/signin", async (req, res) => {
  try {
    // console.log(res.header(), "  headers");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid data" });
    }

    const userLogin = await User.findOne({ email });
    // const token = await userLogin.generateAuthToken();

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();

      console.log(token);

      res.cookie("shubham", token, {
        // expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        return res.status(404).json({ message: "user error" });
      } else {
        return res.status(200).json({ token });
      }
    } else {
      return res.status(404).json({ message: "user error" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get(`/about`, authenticate, (req, res) => {
  // console.log(req.rootUser, " about");
  console.log(req.rootUser, "  sisisisi");
  res.send(req.rootUser);
});

router.get("/getdata", authenticate, (req, res) => {
  console.log(req.query.token_, "  cobtact");
  res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      // alert("Please fill the contact form");
    }

    const userFindContact = await User.findOne({ _id: req.userID });

    if (userFindContact) {
      const userMessage = await userFindContact.addMessage(
        name,
        email,
        phone,
        message
      );
      await userFindContact.save();

      res.status(201).json({ message: "user Contact successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/logout", authenticate, (req, res) => {
  res.clearCookie("token", { path: "/" });

  res.status(200).send("User Logout");
});

module.exports = router;
