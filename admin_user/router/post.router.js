const {
    createPost,
    getPost,
    getPostById,
    updatePost,
    deletePost,
    showpostAdmin,
    showpostUser,
}= require('.././controller/post.controller');

const router = require('express').Router();
const {checkToken, isAdmin,isUser} = require('.././token_validation/token_validation')


router.post('/post', createPost);
// router.get('/post',checkToken,getPost);
router.get('/post/:id',checkToken,getPostById);
router.put('/post',checkToken, updatePost);
router.delete('/post', deletePost);

router.get('/allpost/admin',checkToken,isAdmin,showpostAdmin)
router.get('/allpost/user',checkToken,isUser,showpostUser)

module.exports = router;