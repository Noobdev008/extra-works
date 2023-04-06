const UserModel = require('../models/user.model');

// get all the user list
exports.UserModelList = (req,res)=>{
    UserModel.getAllUser((err,user)=>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('user', user);
        res.send(user)
    })
}

// get user by ID
exports.getUserById = (req, res)=>{
    //console.log('get emp by id');
    UserModel.getUserById(req.params.id, (err, user)=>{
        if(err)
       res.send(err);
        console.log('single user data',user);
        res.send(user);
    })
}

// create new user
exports.createNewUser = (req, res) =>{
    const userReqData = new UserModel(req.body);
    console.log('userReqData', req.body);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.sendStatus(400).send({success: false, message: 'Please fill all fields'});
    }else{
        UserModel.createUser(userReqData, (err, user)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'user Created Successfully', data: user.insertId})
        })
    }
}


// update user
exports.updateUser = (req, res)=>{
    // const userReqData = new UserModel(req.body);
    // console.log('userReqData update', userReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.sendStatus(400).send({success: false, message: 'Please fill all fields'});
    }else{
        UserModel.updateUser(req.params.id, req.body, (err, result)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: result})
        })
    }
}

// delete user
exports.deleteUser = (req, res)=>{
    UserModel.deleteUser(req.params.id, (err, user)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'user deleted successully!'});
    })
}
