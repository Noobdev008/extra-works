const {
    createPost,
    postfindAll,
    postfindByID,
    postUpdate,
    aprrovedPost,
    } =  require('../controllers/post.controller');
    
    const {checkToken, isAdmin,isUser} = require('../token_validation/token_validation')
    const router = require('express').Router();
    
    router.get('/post',checkToken,isAdmin, postfindAll);
    router.get('/post/findall/postall',aprrovedPost);
    
    router.get('/post/:id',checkToken, postfindByID);
    
    
    router.post('/post/create/:id',createPost);
    router.post('/post/:id',createPost);
    
    
    
    
    
    
    module.exports =  router