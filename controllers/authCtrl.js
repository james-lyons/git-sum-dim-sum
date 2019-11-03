// ------------------------- Modules ------------------------- //

const bcrypt = require('bcryptjs');
const db = require('../models');

// ----------------------- Controllers ----------------------- //

// POST Create New User
const register = (req, res) => {
    const errors = [];
    if (!req.body.name) {
        errors.push({ field: 'name', message: 'Please enter your name' })
    };

    if (!req.body.email) {
        errors.push({ field: 'email', message: 'Please enter your email '})
    };

    if (!req.body.password) {
        errors.push({ field: 'password', message: 'Please enter your password' })
    };

    if (req.body.password !== req.body.password2) {
        errors.push({ field: 'password', message: 'Passwords must match'})
    };

    if (errors.length) {
        return res.status(400).json({
            status: 400,
            message: 'bad request'
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

    console.log(1)

    if (!req.body.email || !req.body.password) {
        return res.status(200).json({
            status: 200,
            message: 'Please enter your email and password'
        });
    };

    console.log(2)

    db.User.findOne({ email: req.body.email}, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again'
        });

        console.log(3)

        if (!foundUser) return res.status(400).json({
            status: 400,
            message: 'Email or password is incorrect'
        });

        console.log(4)

        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            console.log(req.body.password)
            if (err) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again'
            });

            console.log(5)

            if (isMatch) {

                console.log(6)

                req.session.currentUser = { _id: foundUser._id, name: foundUser.name };
                return res.status(200).json({
                    status: 200,
                    message: 'Successfully logged in',
                    data: req.session.currentUser
                });

            } else {

                console.log(7)

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
}