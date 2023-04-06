let db = require('../db/db.config');
const Users = db.users
const Posts = db.posts
const Auths = db.auths



const createPost = async (req, res, next) => {
    const id = req.params.id
    console.log(id, " id");
    try {
        // const body = {
        //     user: {
        //         name: req.body.name,
        //         email: req.body.email,
        //         JWT: req.body.JWT,
        //     },
        // };
        let data = await Users.findOne({where:{ id:id }});
        console.log(data.id, " data");

        const body = {
            post: {
                title: req.body.title,
                caption: req.body.caption,
                userId: data.id,
            }
        }
        // console.log(body.auth.password +  " afetr auth");

        let finaldata = await Posts.create(body.post);
        // console.log(finaldata, " final");

        let response = {
            success: 1,
            message: "Post Created",
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

const postfindAll = async (req, res, next) => {


    // console.log(req.body.phoneNumber + " ");
    try {
          let finaldata = await Users.findAll({include:Auths,include:Posts})
        // let data = await Posts.findAll({ include: finaldata});
      
        // console.log(data);

        let response = {
            success: 1,
            // data: data,
            finaldata:finaldata
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
const postfindByID = async (req, res, next) => {
    const id = req.params.id
    const email = req.body.email
    let data = await Users.findByPk(id, { include: Posts })
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

const postUpdate = async (req, res, next) => {
    const id = req.params.id
    console.log(id, " id");
    try {
        // const body = {
        //     user: {
        //         name: req.body.name,
        //         email: req.body.email,
        //         JWT: req.body.JWT,
        //     },
        // };
        let data = await Users.findOne({where:{ id:id }});
        console.log(data.id, " data");

        const body = {
            post: {
                title: req.body.title,
                caption: req.body.caption,
                userId: data.id,
            }
        }
        // console.log(body.auth.password +  " afetr auth");

        let finaldata = await Posts.update(body.post);
        // console.log(finaldata, " final");

        let response = {
            success: 1,
            message: "Post Updated",
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


module.exports = {
    createPost,
    postfindAll,
    postfindByID,
    postUpdate,
}