const express = require('express');
const Router = express.Router();
const User = require('../models/USER');
const bcrypt = require('bcrypt');
const Salt = 10



Router.post('/signup', async (req, res) => {
    try {
        const { username, password } = req.body;

        const doesUserExist = await User.findOne({ username: username });
        

        if (doesUserExist) {
            return res.status(409).json({
                message: "User already exists",
                status: "fail"
            });
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                const newUser = new User({
                    username: username,
                    password: hash // Store the hashed password, not the plain password
                });
                try {
                    await newUser.save();
                    res.status(200).json({ message: "User created successfully", status: "success" });
                } catch (error) {
                    res.status(500).json({ message: error.message });
                }
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




module.exports = Router;