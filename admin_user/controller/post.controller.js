const {
    create,
    getPostById,
    getPost,
    updatePost,
    deletePost,
    getPostByEmail,
    adminPost,
    userPost,
} = require('.././model/post.model');

const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');

module.exports = {
    createPost: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
            if (err) {
                console.log("User Controller: " + err);
                return res.status(500).json({
                    success: 0,
                    message: "Database Connection Error"
                })
            }
            return res.status(200).json({
                success: 1,
                data: results,
            })
        })
    },
    getPostById: (req, res) => {
        const id = req.params.id;
        getPostById(id, (err, results) => {
            if (err) {
                console.log(err)
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found",
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getPost: (req, res) => {
        getPost((err, results) => {
            if (err) {
                console.log(err);
                return
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    updatePost: (req, res) => {
        const body = req.body;
        console.log(body);
        // const salt = genSaltSync(10);
        // body.password = hashSync(body.password, salt);
        updatePost(body, (err, results) => {
            console.log(results);
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to updateUser"

                })
            }
            return res.json({
                success: 1,
                message: "Update Success"
            });
        });
    },
    deletePost: (req, res) => {
        const data = req.body;
        deletePost(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (typeof results === Object) {
                return res.json({
                    success: 0,
                    message: "Record Not Found",
                })
            }
            return res.json({
                success: 1,
                message: "User Delete Successfully",
            })
        });
    },
    showpostAdmin: (req, res, next) => {
        adminPost((err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                res.send("Record not found")
                return
            }
            res.json(results)
        })


        // user();
    },
    showpostUser: (req, res, next) => {
        userPost((err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                res.send("Record not found")
                return
            }
            res.json(results)
        })


        // user();
    },
}