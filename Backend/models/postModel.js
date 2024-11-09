const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: String,
    image: String,
    createdAt: { type: Date, default: Date.now },
    author: { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    isLiked: Boolean,
    comments: [{
        id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
        comment: { type: String }
    }],
});

const PostModel = mongoose.model('posts', postSchema);
module.exports = PostModel