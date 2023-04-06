const express = require('express');

const router = express.Router();

const User = require('../model/user.model')

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    try {
        newUser.save();
        res.status(200).json({ message: "Success!", success: true });
    } catch (err) {
        res.status(400).json({ message: err })
    }
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    // const newUser = new User({ email, password });
    try {
        const user = await User.find({ email, password })
        if (user.length > 0) {
            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isAdmin: user[0].isAdmin,
                _id: user[0]._id,

            }
            res.status(200).send(currentUser);
        } else {
            res.status(400).json({ message: "Login Fail" })
        }


    } catch (err) {
        res.status(404).json({ message: err })
    }
})

router.get('/getallusers',async(req, res)=>{
    const users = await User.find({})
    try {
        res.status(200).send(users)
    } catch (error) {
        res.status(404).json({messages:error.stack})
    }
    
})
router.post('/deletuser', async (req, res) => {
    const userId = req.body.userid
    try {
        await User.findOneAndDelete({_id:userId})
        res.status(200).send("User deleted successfully")
    } catch (error) {
        res.status(502).json({message:error.stack})
    }
})



module.exports = router;