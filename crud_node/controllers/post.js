const PostModel = require('../models/post');

exports.addPost = async(req, res, next) => {
    if (!req.body.postDetails) {
        const error = new Error('Post Details must be passed');
        error.statsCode = 422
        throw error;
    }

    try {
        const newPost = new PostModel(req.body.postDetails);
        const {rows} = await PostModel.create(newPost, req._id);

        res.json({error:false,message:"Post has been created successfully!",data:rows[0]});
    } catch (err) {
        res.json(err);
    }
}

exports.getPost = async(req, res, next) => {
    
    try {
        const {rows} = await PostModel.get(req.query.post_id);
        res.json({error:false,message:"Post has been fetched successfully!",data:rows[0]});
    } catch (err) {
        res.json(err);
    }
}

exports.updatePost = async(req, res, next) => {

    if (!req.body.postDetails) {
        const error = new Error('Post Details must be passed');
        error.statsCode = 422
        throw error;
    }

    try {
        const newPost = new PostModel(req.body.postDetails);
        const {rows} = await PostModel.update(req.query.post_id, newPost); 
        res.json({error:false,message:"User updated successfully!",data:rows[0]});
    } catch(err) {
        res.json(err);
    }
}

exports.deleteUser = async(req, res, next) => {

    try {
        const {rows} = await PostModel.delete(req.query.post_id);
        res.json({error:false,message:"User deleted successfully!",data:rows[0]});
    } catch(err) {
        res.json(err);
    }
}

exports.getUserPosts = async(req, res, next) => {

    try {
        const {rows} = await PostModel.getUserPosts(req._id);
        res.json({error:false,message:"All user posts.",data:rows});
    } catch(err) {
        res.json(err);
    }
}