const {
createPost,
postfindAll,
postfindByID,
postUpdate,
} =  require('../controller/post.controller');

const {checkToken, isAdmin,isUser} = require('../token_validation/token_validation')
const router = require('express').Router();

router.get('/post',checkToken, postfindAll);

router.get('/post/:id',checkToken, postfindByID);


router.post('/post/create/:id',createPost);
router.post('/post/:id',createPost);






module.exports =  router