const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

//get all users
router.get('/',userController.UserModelList);

// get user by id
router.get('/:id',userController.getUserById);

// create a new user
router.post('/',userController.createNewUser);

//update user
router.put('/:id', userController.updateUser);

//delete user
router.delete('/:id',userController.deleteUser);

module.exports = router;