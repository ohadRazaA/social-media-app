const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: String,
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' }],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }]
});

const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel