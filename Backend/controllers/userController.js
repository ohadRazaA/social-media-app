const UserModel = require('../models/userModel');
const mongoose = require('mongoose');
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
    const userFound = await UserModel.findById(req.params.id);
    if (!userFound) {
        return res.status(404).send('User not found');
    }
    res.status(200).send(userFound);
}


module.exports = {
    createUser,
    authUser,
    getUser
}