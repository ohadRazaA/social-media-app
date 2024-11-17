const UserModel = require('../models/userModel');
const PostModel = require('../models/postModel');
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    const { firstName, lastName, email, userPassword } = req.body;
    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash(userPassword, salt);
    const newUser = new UserModel({
        firstName,
        lastName,
        email,
        password
    });
    try {
        const user = await newUser.save();
        res.status(200).json({ message: 'Signup successful', userId: user._id });
    }
    catch (err) {
        res.status(401).send('user already exist');
    }
}

const authUser = async (req, res) => {
    const { email, userPassword } = req.body
    const userFound = await UserModel.findOne({ email });
    if (!userFound) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(userPassword, userFound.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
    }
    res.status(200).json({
        message: 'Login successful',
        userId: userFound._id,
    });
}
const getUser = async (req, res) => {
    const allUsers = await UserModel.find()
    // .populate('posts');
    const userFound = await UserModel.findById(req.params.id);
    if (!userFound) {
        return res.status(404).send('User not found');
    }
    let recommendations = allUsers.sort(() => Math.random() - 0.5).slice(0, 4);
    const recommendedUser = recommendations.filter(u => u._id.toString() !== userFound._id.toString());
    const posts = await PostModel.find({ author: userFound._id });
    userFound.posts = posts;
    res.status(200).json({ userFound, recommendedUser, allUsers });
}

const addUsersFriend = async (req, res) => {
    const { friendId, userId } = req.body;
    try {
        const user = await UserModel.findById(userId);
        const addFriendIndex = user.friends.findIndex(friend => friend.toString() === friendId);
        if (addFriendIndex !== -1) {
            user.friends.splice(addFriendIndex, 1);
        } else {
            user.friends.push(friendId);
        }
        await user.save();
        res.status(200).json({ user });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};


module.exports = {
    createUser,
    authUser,
    getUser,
    addUsersFriend,
}