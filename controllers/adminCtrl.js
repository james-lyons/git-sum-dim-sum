// ------------------------- Modules ------------------------- //

const bcrypt = require('bcryptjs');
const db = require('../models');

// ----------------------- Controllers ----------------------- //

const indexUsers = (req, res) => {
    if (req.session.currentUser.role !== "admin") {
        res.status(400).json({
            status: 400,
            message: 'Must be an admin to create restaurants, sorry!',
        })
    };

    db.User.find({}, (err, foundUsers) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: 'Successfully fetched users.',
            data: foundUsers
        });
    })
    .populate('reviews');
};

const deleteUser = (req, res) => {
    if (req.session.currentUser.role !== "admin") {
        res.status(400).json({
            status: 400,
            message: 'Must be an admin to create restaurants, sorry!',
        })
    };

    db.User.findByIdAndDelete(req.params.user_id, (error, deletedReview) => {
        if (error) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.',
            data: err
        });

        res.status(200).json({
            status: 200,
            message: 'Successfully deleted review.',
        });
    });
};

const indexRestaurants = (req, res) => {
    if (req.session.currentUser.role !== "admin") {
        res.status(400).json({
            status: 400,
            message: 'Must be an admin to create restaurants, sorry!',
        })
    };
    
    db.Restaurant.find({}, (err, foundRestaurants) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: 'Successfully fetched restaurants.',
            data: foundRestaurants
        });
    })
    .populate('reviews');
};

const addRestaurant = (req, res) => {
    if (req.session.currentUser.role !== "admin") {
        res.status(400).json({
            status: 400,
            message: 'Must be an admin to create restaurants, sorry!',
        })
    };

    db.Restaurant.create(req.body, (err, createdRestaurant) => {
        if (err) return res.status(200).json({
            status: 200,
            message: 'Something went wrong, please try again.',
            data: err
        });
        res.status(200).json({
            status: 200,
            message: 'Restaurant successfully created.',
            data: createdRestaurant
        });
    });
};

const deleteRestaurant = (req, res) => {
    console.log(req.params)
    if (req.session.currentUser.role !== "admin") {
        res.status(400).json({
            status: 400,
            message: 'Must be an admin to create restaurants, sorry!',
        })
    };

    db.Restaurant.findByIdAndDelete(req.params.restaurant_id, (error, deletedReview) => {
        if (error) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.',
            data: err
        });

        res.status(200).json({
            status: 200,
            message: 'Successfully deleted review.',
        });
    });
};


module.exports = {
    indexUsers,
    deleteUser,
    indexRestaurants,
    addRestaurant,
    deleteRestaurant
};