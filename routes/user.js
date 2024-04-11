const express = require('express');
const Router = express.Router();
const User = require('../models/USER');
const bcrypt = require('bcrypt');
const Salt = 10
const jwt = require('jsonwebtoken');
const auth = require('../config/checkAuth');
const expiresindays = 3
const expiresinseconds = expiresindays * 60 * 60 * 24 




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

        bcrypt.genSalt(Salt, (err, Salt) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            bcrypt.hash(password, Salt, async (err, hash) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                const newUser = new User({
                    username: username,
                    password: hash 
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


Router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                status: "fail"
            });
        }
        
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            if (result) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                    expiresIn: expiresinseconds
                });
                req.headers.authorization = token
                res.cookie('token', token, { httpOnly: true });
                res.status(200).json({ message: "User logged in successfully", status: "success" , token : token });
            } else {
                return res.status(401).json({
                    message: "Incorrect password",
                    status: "fail"
                });
            }
        });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// access profile
Router.get('/profile' , auth , async  (req, res) => {
    try {
        const profile = await User.find({_id : req.user.id}).select('-password')
       res.json(profile);


    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})


Router.patch('/profile', auth, async (req, res) => {
    try {
        console.log(req.body)
        const profile = await User.findOneAndUpdate({_id : req.user.id}, req.body, {new: true})
        res.json(profile);



    } 
    
    
    catch (err) {
        res.status(500).json({ message: err.message });
    }

})

module.exports = Router;