const router = require('express').Router();

const postController = require('../controllers/post');
const { verifyToken } = require('../middlewares/verifyAuth');

router.post(
    '/add',
    verifyToken,
    postController.addPost
);

router.get(
    '/get',
    verifyToken,
    postController.getPost
);

router.put(
    '/update',
    verifyToken,
    postController.updatePost
)

router.delete(
    '/delete',
    verifyToken,
    postController.deleteUser
);

router.get(
    '/user-posts',
    verifyToken,
    postController.getUserPosts
);


module.exports = router;