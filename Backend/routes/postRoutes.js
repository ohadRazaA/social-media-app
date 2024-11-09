const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/posts', postController.createPost);
router.get('/posts/:userId', postController.fetchPosts);
router.delete('/posts/:postId', postController.deletePost);
router.put('/posts/edit/:postId', postController.editPost);
router.patch('/posts/like', postController.likePost);
router.patch('/posts/comment', postController.commentPost);

module.exports = router;