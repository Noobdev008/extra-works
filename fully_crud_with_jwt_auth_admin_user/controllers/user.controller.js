const db = require('../db/db.config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mailer = require('nodemailer');
const { Op } = require('sequelize');

const accountSid = 'AC6c0c84d6e2dfdc9375732a2e0f458f1d';
const authToken = '66bbf425d4cf85abfc511e454a3d161c';
const client = require('twilio')(accountSid, authToken);

const Users = db.users;
const Auths = db.auths;

const userRegistration = async (req, res) => {
    req.body.password = await bcrypt.hash(req.body.password, 10)
    const email = req.body.email
    const userType = req.body.userType
    req.body.JWT = jwt.sign({ email: email, userType: userType }, "SECRET_KEY");
    try {
        if (req.body.phoneNumber <= 10 && req.body.phoneNumber >= 13) {
            return res.status(403).send("Phone Number not valid")
        }
        const body = {
            user: {
                name: req.body.name,
                email: req.body.email,
                JWT: req.body.JWT,
                userType: req.body.userType,
            }
        }
        let creation = await Users.create(body.user)
        // console.log(creation.id , " id");

        body.auth = {
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            userId: creation.id
        }



        let finalCreation = await Auths.create(body.auth);
        // console.log(finalCreation);

        let response = {
            success: 1,
            message: "User created successfully",
            finalCreation: finalCreation,
        }

        res.status(200).send(response)
    } catch (err) {
        // console.log(err, 'resgitraion');
        res.status(401).send({
            success: 0,
            err: err,
        })
    }
}


const login = async (req, res) => {
    const { email, password, userType } = req.body;
    const userWithEmail = await Auths.findOne({ where: { email }, attributes: ["password", "email", "userId"], }).catch((err) => {
        console.log("err", err);
    });
    console.log(userWithEmail.dataValues, " userrrrr");

    if (!userWithEmail) {
        return res.status(404).send({
            message: "Email or Password does not match!"
        })
    }
    let user = bcrypt.compare(password, userWithEmail.password)
    // console.log(user, " user");
    if (user) {
        req.body.JWT = jwt.sign({ email: userWithEmail.email, userType: userType }, "SECRET_KEY", { expiresIn: "1h" });
        await Users.update({ JWT: req.body.JWT }, { where: { id: userWithEmail.dataValues.userId } });
        res.json({
            message: "Welcome Back",
            token: req.body.JWT
        });

    }
    else {
        return res.status(401).send({
            message: "Email or Password does not match!"
        })
    }
    // userWithEmail.JWT = await Users.update()
}

const logout = async (req, res) => {
    const { email, JWT } = req.body
    let token = await Users.findOne({ where: { email }, attributes: ["JWT", "email", "id"], })
    console.log(token.dataValues.id + "  TOKEN");
    // token.JWT = 
    token.JWT = await Users.update({ JWT: null }, { where: { id: token.dataValues.id } });
    // console.log(token.JWT+  " jwttt");

    if (token.JWT) {
        res.status(200).send({
            message: "Logged Out Successfully!!!"
        })
    } else {
        res.status(403).send({
            message: "Failed..."
        })
    }
}

const findAll = async (req, res) => {
    try {
        let findall = await Users.findAll({ include: Auths })
        let response = {
            success: 1,
            findall: findall
        }
        res.status(200).send(response)
    } catch (err) {
        let response = {
            success: 1,
            err: "Not Found!"
        }
        res.status(404).send(response)
    }
}
const findOne = async (req, res) => {
    const id = req.params.id
    // const email = req.body.email
    let data = await Users.findByPk(id, { include: Auths })
    try {
        let response = {
            success: 1,
            data: data
        }
        if (response.data == null) {
            res.status(401).json({
                success: 0,
                message: "User Doesn't exist",
            })
        }
        res.status(200).json(response)
    } catch (err) {
        // console.log(err, " err userfindbyid");
        res.status(500).send({
            success: 0,
            message: "Server Error",
        })
    }
}

const userUpdate = async (req, res, next) => {
    const id = req.params.id
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // console.log(req.body.password + " password");
    req.body.JWT = jwt.sign(req.body.email, "SECRET_KEY");
    // console.log(req.body, " req.body");
    try {
        const body = {
            user: {
                name: req.body.name,
                email: req.body.email,
                JWT: req.body.JWT,
            },
        };
        let data = await Users.update(body.user, { where: { id: id } });

        body.auth = {
            email: req.body.email,
            password: req.body.password,
            userId: data.id,
        }
        // console.log(body.auth.password +  " afetr auth");

        let finaldata = await Auths.update(body.auth, { where: { userId: id } });
        // console.log(finaldata , " final");

        let response = {
            success: 1,
            message: "User Updated",
        }
        res.status(200).send(response)
    } catch (err) {
        // console.log(err, "err");
        res.status(401).send({
            success: 0,
            message: "Either dupicate entry or creation not succesful",
            err: err,
        })
    }
}

const sentOtp = async (req, res) => {
    const email = req.body.email;
    const otpGenrate = () => {
        let numbers = "0123456789";
        let OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += numbers[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
    const otp = otpGenrate();
    client.messages.create({
        body: `Hi this is your OTP ${otp}`,
        from: '+19127328394',
        to: req.body.phoneNumber,
    }).then(
        messages => console.log(messages)
    ).catch(
        (err) => console.error(err)
    );
    const transporter = mailer.createTransport({
        service: "gmail",
        auth: {
            user: 'shubham.srivastava@appventurez.com',
            pass: 'Shubham@199808',
        },
    });

    var mailOptions = {
        from: 'shubham.srivastava@appventurez.com',
        to: req.body.email,
        subject: "OTP to verify your Account....",
        text: `Your OTP is : ${otp}`,
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    await Auths.update({ forgetPasswordOTP: otp }, { where: { email: email } });
    res.status(200).send("PLEASE check your Email and Verify your ACCOUNT");
}
const verifyOTP = async (req, res) => {
    const { email, forgetPasswordOTP } = req.body
    // console.log(forgetPasswordOTP , "   SSGS");
    try {
        const data = await Auths.findOne({
            where: { email: req.body.email },
            attributes: ["forgetPasswordOTP", "isVarified"],
        });
        // console.log(data.dataValues.forgetPasswordOTP + " " + req.body.forgetPasswordOTP);
        req.body.forgetPasswordOTP === data.dataValues.forgetPasswordOTP
            ? Auths.update({ forgetPasswordOTP: null, isVarified: 1 }, { where: { email: req.body.email } })
            : res.status(403).send("Wrong OTP , Please try AGAIN!!!!");
        res.status(200).send("Account was successfully Verified....");
    } catch (err) {
        res.send(`${new Error(err)}`);
    }
};



module.exports = {
    userRegistration,
    login,
    logout,
    findAll,
    findOne,
    userUpdate,
    sentOtp,
    verifyOTP,
}