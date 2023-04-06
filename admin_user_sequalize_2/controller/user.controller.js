let db = require('../db/db.config');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailer = require('nodemailer');
const { Op } = require('sequelize');

const accountSid = 'AC6c0c84d6e2dfdc9375732a2e0f458f1d';
const authToken = '66bbf425d4cf85abfc511e454a3d161c';
const client = require('twilio')(accountSid, authToken);

// // console.log(db.users, ' hhuhi');
const Users = db.users
const Auths = db.auths
const Posts = db.posts
// // console.log(Users, " Users");
// const QueryTypes = require('sequelize')

const createUser = async (req, res, next) => {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // console.log(req.body.password + " password");
    const email =  req.body.email
    const userType = req.body.userType
    req.body.JWT = jwt.sign({email:email,userType:userType},"SECRET_KEY");
    // console.log(req.body, " req.body");
    try {
        const body = {
            user: {
                name: req.body.name,
                email: req.body.email,
                JWT: req.body.JWT,

            },
        };
        let data = await Users.create(body.user);

        body.auth = {
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            userId: data.id,

        }
        // console.log(body.auth.password +  " afetr auth");

        let finaldata = await Auths.create(body.auth);
        // console.log(finaldata , " final");

        let response = {
            success: 1,
            message: "User Created",
            jwt: data.JWT,
            data: data,
            finaldata: finaldata
        }
        res.status(200).send(response)
    } catch (err) {
        console.log(err, "err");
        res.status(401).send({
            success: 0,
            err: err,
        })
    }

}

const createAdmin = async (req, res) => {
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    // console.log(req.body.password + " password");
    const email =  req.body.email
    const userType = req.body.userType
    req.body.JWT = jwt.sign({emai:email , userType:userType}, "SECRET_KEY");
    // console.log(req.body, " req.body");
    try {
        const body = {
            user: {
                name: req.body.name,
                email: req.body.email,
                JWT: req.body.JWT,
                userType:req.body.userType
            },
        };
        let data = await Users.create(body.user);

        body.auth = {
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            userId: data.id,

        }
        // console.log(body.auth.password +  " afetr auth");

        let finaldata = await Auths.create(body.auth);
        // console.log(finaldata , " final");

        let response = {
            success: 1,
            message: "Admin Created",
            jwt: data.JWT,
            data: data,
            finaldata: finaldata
        }
        res.status(200).send(response)
    } catch (err) {
        console.log(err, "err");
        res.status(401).send({
            success: 0,
            err: err,
        })
    }
}

const userfindAll = async (req, res, next) => {


    // console.log(req.body.phoneNumber + " ");
    try {
        let data = await Users.findAll({ include: Auths });
        // let finaldata = await Auths.findAll({})
        // console.log(data[0]);

        let response = {
            success: 1,
            data: data,
            // finaldata:finaldata
        }
        res.status(200).json(response)
    } catch (err) {
        console.log(err, "errFindAll");
        res.status(401).send({
            success: 0,
            message: "Try to check proper api",
            err: err,
        })
    }

}

const userfindByID = async (req, res, next) => {
    const id = req.params.id
    const email = req.body.email
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
        console.log(err, " err userfindbyid");
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
        console.log(err, "err");
        res.status(401).send({
            success: 0,
            message: "Either dupicate entry or creation not succesful",
            err: err,
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const userWithEmail = await Auths.findOne({ where: { email }, attributes: ["password", "email", "userId"], }).catch((err) => {
        console.log("err", err);
    });
    // console.log(userWithEmail.dataValues , " userrrrr");

    if (!userWithEmail) {
        return res.status(404).send({
            message: "Email or Password does not match!"
        })
    }
    let user = bcrypt.compareSync(password, userWithEmail.password)
    // console.log(user, " user");
    if (user) {
        req.body.JWT = jwt.sign({ email: userWithEmail.email }, "SECRET_KEY", { expiresIn: "1h" });
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

const sendOTP = async (req, res) => {

    // console.log(req.body.phoneNumber + " number");
    const email = req.body.email
    // console.log(email + " emaill");

    const generateOTP = () => {
        let numbers = "0123456789";
        let OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += numbers[Math.floor(Math.random() * 10)];
        }
        return OTP;
    };

    const OTP = generateOTP();
    client.messages
        .create({
            body: `Hi Shubham Your OTP is ${OTP}`,
            from: '+19127328394',
            to: req.body.phoneNumber
        })
        .then(message => console.log(message)).catch((err) => console.log(err));
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
        text: `Your OTP is : ${OTP}`,
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    await Auths.update({ forgetPasswordOTP: OTP }, { where: { email: req.body.email } });
    res.status(200).send("PLEASE check your Email and Verify your ACCOUNT");
};

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
const search = async (req, res) => {
    // console.log("hi");
    const title = req.query.title;
    const search = await Users.findAll({
        where: { name: { [Op.like]: `%${title}%` } },
    });
    // console.log(search , " sss");
    if (!search)
        res.status(404).send(`Sorry! We can't find what you are looking for.`);
    res.status(200).send(search);
};

const pagination = async (req, res) => {
    try {
        let { title, page } = req.query;
        page = parseInt(page);
        if (page == 0) return res.status(404).send(`Resource not found.....`);
        const limit = 4;
        const size = (page - 1) * limit;
        const search = {};
        search.count = await Posts.count({
            where: { title: { [Op.like]: `%${title}%` } },
        });
        search.results = await Posts.findAll({
            where: { title: { [Op.like]: `%${title}%` } },
            limit: limit,
            offset: size,
        });
        if (page != 1) search.previous = { page: page - 1 };
        if (page < search.count / limit) search.next = { page: page + 1 };
        if (search.results.length == 0)
            return res.status(404).send(`Resource not found.....`);
        res.status(200).send(search);
    } catch (err) {
        res.status(403).send(`${new Error(err)}`);
    }
}


module.exports = {
    createUser,
    userfindAll,
    userfindByID,
    userUpdate,
    login,
    logout,
    sendOTP,
    verifyOTP,
    search,
    pagination,
    createAdmin,
}
