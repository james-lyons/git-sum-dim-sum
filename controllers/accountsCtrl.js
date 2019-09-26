// ------------------------- Modules ------------------------- //

const bcrypt = require('bcryptjs');
const db = require('../models');

// ----------------------- Controllers ----------------------- //

// Get New User
const newUser = (req, res) => {
    res.render('accounts/signup');
};

// POST Create New User
const createUser = (req, res) => {
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
        return res.render('accounts/signup', { errors })
    };

    // Generate Hash Salt
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return res.render('accounts/signup', { errors: [
            {message: 'Something went wrong, please try again'}] });

        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) return res.render('accounts/signup', { errors: [
                {message: 'Something went wrong, please try again'}] });

            const newUser = req.body;
            newUser.password = hash;

            db.User.create(newUser, (err, savedUser) => {
                if (err) return res.render('accounts/signup', {errors: [
                    {message: 'Something went wrong, please try again'}] });

                res.redirect('/accounts/login/', )
            });
        });
    });
};

// ------------------------- Login ------------------------- //
const newSession = (req, res) => {
    res.render('accounts/login');
}

const createSession = (req, res) => {
    const errors = [];
    if (!req.body.email) {
        errors.push({ field: 'email', message: 'Please enter your email '})
    };

    if (!req.body.password) {
        errors.push({ field: 'password', message: 'Please enter your password' })
    };

    if (errors.length) {
        return res.render('accounts/login', { errors })
    };

    db.User.findOne({ email: req.body.email}, (err, foundUser) => {
        if (err) return res.render('accounts/login', { errors: [
            {message: 'Something went wrong, please try again'}] });

        if (!foundUser) {
            return res.render('accounts/login', { errors: [
                {message: 'Username or password is incorrect'}] });
            }

        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.render('accounts/signup', {errors: [
                {message: 'Something went wrong, please try again'}] });
            if (isMatch) {
                req.session.currentUser = { 
                    _id: foundUser._id,
                    name: foundUser._name,
                    email: foundUser.email
                };
                res.redirect('/profile');
            } else {
                return res.render('accounts/login', { errors: [{ message: 'Username or password is incorrect'}] });
            };
        });
    });
};

const deleteSession = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.render('accounts/login', { errors: [{ message: 'something went wrong, please try again' }] });
    });
    res.redirect('/accounts/login');
};

module.exports = {
    newUser,
    createUser,
    newSession,
    createSession,
    deleteSession
}