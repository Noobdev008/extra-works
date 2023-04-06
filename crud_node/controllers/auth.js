const AuthModel = require('../models/auth');

exports.addAuth = async(req, res, next) => {
    if (!req.body.authDetails) {
        const error = new Error('Post Details must be passed');
        error.statsCode = 422
        throw error;
    }

    try {
        const {rows} = await AuthModel.getByUserId(req._id);
        if (rows.length == 0) {
            const error = new Error('Interval server error');
            error.statsCode = 422
            throw error;
        }
        const auth = await AuthModel.update(req._id, req.body.authDetails);
        res.json({error:false,message:"Auth has been added successfully!",data:auth.rows[0]});
    } catch(err) {
        res.json(err);
    }
}

exports.update = async(req, res, next) => {
    if (!req.body.authDetails) {
        const error = new Error('Post Details must be passed');
        error.statsCode = 422
        throw error;
    }
    
    try {
        const auth = await AuthModel.update(req._id, req.body.authDetails);
        res.json({error:false,message:"Auth has been added successfully!",data:auth.rows[0]});
    } catch(err) {
        res.json(err);
    }
}
