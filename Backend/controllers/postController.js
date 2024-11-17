const PostModel = require('../models/postModel');
const UserModel = require('../models/userModel');
const mongoose = require('mongoose');

const createPost = async (req, res) => {
    const { image, caption, author } = req.body;
    const newPost = new PostModel({
        image,
        caption,
        author
    });
    try {
        const post = await newPost.save();
        const userFound = await UserModel.findByIdAndUpdate(
            author,
            { $push: { posts: post._id } },
            { new: true }
        );
        res.status(200).json({ message: 'post added successfully', post, userFound });
    }
    catch (err) {
        res.status(401).json({ message: err });
    }
}
const fetchPosts = async (req, res) => {
    try {
        const postsFound = await PostModel.find().sort({ createdAt: -1 }).populate('author');
        const userPosts = postsFound.filter(post => post.author._id.toString() === req.params.userId);
        const friendsPosts = postsFound.filter(post => !userPosts.includes(post));
        res.status(200).json(friendsPosts);
    } catch (err) {
        res.status(401).send('try again later');
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await PostModel.findByIdAndDelete(req.params.postId);
        if (!post) return res.status(404).send('post not found');
        res.status(200).send('post deleted');
    } catch (err) {
        res.status(500).send('server error');
    }
}

const editPost = async (req, res) => {
    const postId = req.params.postId;
    const { caption, postPic } = req.body;
    const editPost = {
        caption,
        postPic,
    }
    const updatedPost = Object.keys(editPost).reduce((acc, post) => {
        if (editPost[post]) acc[post] = editPost[post];
        return acc;
    }, {});
    const editedPost = await PostModel.findByIdAndUpdate(postId, updatedPost, { new: true });
    res.send(editedPost);
}

const likePost = async (req, res) => {
    const { postId, userId } = req.body;
    try {
        const post = await PostModel.findById(postId);
        const likedIndex = post.likes.findIndex(like => like.toString() === userId);
        if (likedIndex !== -1) {
            post.likes.splice(likedIndex, 1);
        } else {
            post.likes.push(userId);
        }
        await post.save();
        res.status(200).json({ post });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const commentPost = async (req, res) => {
    const { postId, userId, comment } = req.body;
    const id = new mongoose.Types.ObjectId(userId);
    try {
        const post = await PostModel.findByIdAndUpdate(postId, {
            $push: {
                comments: {
                    id,
                    comment
                }
            }
        }, { new: true });
        res.send(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createPost,
    fetchPosts,
    deletePost,
    editPost,
    likePost,
    commentPost,
}