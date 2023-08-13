'use strict';
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer');
const path = require('path');
require('dotenv').config()

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Upload directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});
const upload = multer({ storage: storage }).single('profileImage');

exports.findAll = function (req, res) {
    User.findAll(function (err, user) {
        if (err)
            res.send(err);
        return res.status(200).send({ error: false, data: user });
    });
};

exports.create = function (req, res) {
    //handles null error
    // if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //     res.status(400).send({ error: true, message: 'Please provide all required field' });
    if (!req.body.name || !req.body.email || !req.body.phone || !req.body.password || !req.body.confirm_password) {
        return res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        User.findByOrCondition([{ email: req.body.email }, { phone: req.body.phone }], async function (err, user) {
            user = await user;
            if (user.length > 0) {
                return res.status(422).send({ error: true, message: 'User Already Exists' });
            } else {
                if (req.body.password !== req.body.confirm_password) {
                    return res.status(501).send({ error: true, message: 'Passwords do not match' });
                }
                req.body.raw_password = req.body.password;
                req.body.password = await bcrypt.hash(req.body.password, 8);
                const new_user = new User(req.body);
                User.create(new_user, function (err, user) {
                    if (err)
                        res.send(err);
                    return res.status(200).send({ error: false, message: "Account Created successfully!" });
                });
            }
        });
    }
};

exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        return res.status(200).send({ error: false, data: user });
    });
};

exports.update = async function (req, res) {
    const userId = req.params.id;
    const { name, email, phone, gender, raw_password, status } = req.body;
    // Get the user by ID
    User.findById(userId, async function (err, user) {
        if (err) {
            return res.status(500).send({ error: true, message: 'Internal server error' });
        }

        if (!user || user.length == 0) {
            return res.status(404).send({ error: true, message: 'User not found' });
        }

        // Update user data
        user.name = name || user.name;
        user.email = email || user.email;
        user.phone = phone || user.phone;
        user.gender = gender || user.gender;
        user.status = status || user.status;
       

        // If a new password is provided, update it
        if (raw_password) {
            if (raw_password !== req.body.raw_password) {
                return res.status(400).send({ error: true, message: 'Passwords do not match' });
            }
            user.password = await bcrypt.hash(raw_password, 8);
            user.raw_password = raw_password || user.raw_password;
        }

        // Handle file upload
        upload(req, res, function (err) {
            if (err) {
                return res.status(500).send({ error: true, message: 'Error uploading file' });
            }

            if (req.file) {
                // File uploaded successfully, you can save the file path in the user's data in-memory
                user.profileImage = req.body.profileImage;
            }

            // Save the updated user data
            User.update(req.params.id, user, function (err, user) {
                if (err)
                    res.send(err);
                return res.status(200).send({ error: false, message: 'User successfully updated' });
            });
        });
    });
};

exports.delete = function (req, res) {
    User.delete(req.params.id, function (err, user) {
        if (err)
            res.send(err);
        return res.json({ error: false, message: 'User successfully deleted' });
    });
};