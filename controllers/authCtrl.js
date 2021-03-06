// ------------------------- Modules ------------------------- //

const bcrypt = require('bcryptjs');
const db = require('../models');
const validateUser = require('../validation/userRegistration');

// ----------------------- Controllers ----------------------- //

// POST Create New User
const register = (req, res) => {
    const { errors, notValid } = validateUser(req.body);

    if (notValid) {
        return res.status(400).json({
            status: 400,
            errors
        });
    };

    db.User.findOne({ email: req.body.email }, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: "Something went wrong, please try again."
        });

        if (foundUser) return res.status(400).json({
            status: 400,
            message: 'Email already registered'
        });

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again'
            });
    
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) return res.status(500).json({
                    status: 500,
                    message: 'Something went wrong, please try again'
                })
    
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    profile_image: req.body.profile_image,
                    password: hash,
                    password2: hash
                };
    
                db.User.create(newUser, (err, savedUser) => {
                    if (err) return res.status(500).json({
                        status: 500,
                        message: 'Something went wrong, please try again'
                    });

                    res.status(201).json({
                        status: 201,
                        message: 'Created new user',
                        data: newUser
                    });
                });
            });
        });
    });
};

// ------------------------- Login ------------------------- //

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(200).json({
            status: 200,
            message: 'Please enter your email and password'
        });
    };

    db.User.findOne({ email: req.body.email}, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again'
        });

        if (!foundUser) return res.status(400).json({
            status: 400,
            message: 'Email or password is incorrect'
        });

        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again'
            });

            if (isMatch) {
                req.session.currentUser = { _id: foundUser._id, name: foundUser.name, role: foundUser.role };
                return res.status(200).json({
                    status: 200,
                    message: 'Successfully logged in',
                    data: foundUser
                });

            } else {

                return res.status(400).json({
                    status: 400,
                    message: "Email or password is incorrect"
                });
            };
        });
    });
};

const logout = (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });
        res.sendStatus(200);
    });
};

module.exports = {
    register,
    login,
    logout
};