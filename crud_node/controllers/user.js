const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/user');
const AuthModel = require('../models/auth');

exports.register = async(req, res, next) => {
    if (!req.body.userDetails) {
        const error = new Error('User Details must be passed');
        error.statsCode = 422
        throw error;
    }

    try {

        const userDetails = {...req.body.userDetails}

        const user = await UserModel.findByEmail(userDetails.email);
        if (user.rows[0]) {
            const error = new Error('Email already exists');
            error.msg = "A user is already exists by this email";
            error.statsCode = 409
            throw error;
        }
        
        const hashPW = await bcrypt.hash(userDetails.password, 12);
        userDetails.password = hashPW;
        const newUser = new UserModel(userDetails);
        const {rows} = await UserModel.create(newUser);

        await AuthModel.create(rows[0].id);

        res.json({error:false,message:"User registered successfully!",data:rows[0]});
    } catch (err) {
        res.json(err);
    }
}

exports.login = async(req, res, next) => {
    if (!req.body.userDetails) {
        const error = new Error('User Details must be passed');
        error.statsCode = 422
        throw error;
    }

    try {

        const userDetails = {...req.body.userDetails}

        const user = await UserModel.findByEmail(userDetails.email);
        if (!user.rows[0]) {
            const error = new Error('Email does not exists');
            error.msg = "A user is not exists by this email";
            error.statsCode = 409
            throw error;
        }

        const passEql = await bcrypt.compare(userDetails.password, user.rows[0].password);

        if (!passEql) {
            const error = new Error('Password is wrong');
            error.msg = "Password does not match";
            error.statsCode = 409
            throw error;
        }

        const token = jwt.sign(
            {
                _id: user.rows[0].id.toString(),
                type: user.rows[0].type
            },
            process.env.JWT_SUPERKEY,
            {expiresIn: '24hr'}
        )
        
        res.json({user: user.rows[0], token});

    } catch (err) {
        res.json(err);
    }
}

exports.getUser = async(req, res, next) => {
    
    try {
        const {rows} = await UserModel.get(req._id);

        if (!rows[0]) {
            const error = new Error('Use could not be found');
            error.msg = "User could not be found";
            error.statsCode = 500;
            throw error;
        }

        res.json({error:false,message:"User added successfully!",data:rows[0]});
    } catch(err) {
        res.json(err);
    }
}

exports.updateUser = async(req, res, next) => {

    if (!req.body.userDetails) {
        const error = new Error('User Details must be passed');
        error.statsCode = 422
        throw error;
    }

    try {
        const user = await UserModel.findById(req._id);

        if (!user.rows[0]) {
            const error = new Error('Use could not be found');
            error.msg = "User could not be found";
            error.statsCode = 500;
            throw error;
        }

        const newUser = new UserModel(req.body.userDetails);
        const {rows} = await UserModel.update(req._id, newUser)

        res.json({error:false,message:"User added successfully!",data:rows[0]});
    } catch(err) {
        console.log(err)
    }
}

exports.deleteUser = async(req, res, next) => {

    try {
        const user = await UserModel.findById(req._id);

        if (!user.rows[0]) {
            const error = new Error('Use could not be found');
            error.msg = "User could not be found";
            error.statsCode = 500;
            throw error;
        }

        const {rows} = await UserModel.delete(req._id);
        res.json({error:false,message:"User added successfully!",data:rows[0]});
    } catch(err) {
        res.json(err);
    }
}

exports.resetPassword = async(req, res, next) => {
    if (!req.body.userDetails) {
        const error = new Error('User Details must be passed');
        error.statsCode = 422
        throw error;
    }

    try {
        const userDetails = {...req.body.userDetails};
        const user = await UserModel.findById(req._id);
        if (!user.rows[0]) {
            const error = new Error('Use could not be found');
            error.msg = "User could not be found";
            error.statsCode = 500;
            throw error;
        }

        const passEql = await bcrypt.compare(userDetails.old_password, user.rows[0].password);
        if (!passEql) {
            const error = new Error('Password is wrong');
            error.msg = "Password does not match";
            error.statsCode = 409
            throw error;
        }

        const hashPW = await bcrypt.hash(userDetails.new_password, 12);
        const {rows} = await UserModel.resetPassword(req._id, hashPW);

        res.json({error:false,message:"Password has been reset successfully!",data:rows[0]});
    } catch (err) {
        res.json(err);
    }
}

exports.forgetPassword = async(req, res, next) => {
    if (!req.body.userDetails) {
        const error = new Error('User Details must be passed');
        error.statsCode = 422
        throw error;
    }

    try {
        const userDetails = {...req.body.userDetails};
        const user = await UserModel.findByEmail(userDetails.email);
        if (!user.rows[0]) {
            const error = new Error('Use could not be found with this email');
            error.msg = "User could not be found with this email";
            error.statsCode = 404;
            throw error;
        }

        const hashPW = await bcrypt.hash(userDetails.password, 12);
        const {rows} = await UserModel.resetPassword(user.rows[0].id, hashPW);

        res.json({error:false, message:"Password has been reset successfully!", data:rows[0]});
    } catch (err) {
        res.json(err);
    }
}