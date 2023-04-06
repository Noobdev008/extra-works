const { createUser,
    getUser,
    getUserById,
    updateUser,
    deleteUser,
    login,

} = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require('../../auth/token_validation')

router.post('/', createUser);
router.get('/', checkToken, getUser);
// router.get('/profile',checkToken,getUser);
router.get('/:id', checkToken, getUserById);
router.patch('/', checkToken, updateUser);
router.delete('/', checkToken, deleteUser);

router.post('/login', login);

module.exports = router;