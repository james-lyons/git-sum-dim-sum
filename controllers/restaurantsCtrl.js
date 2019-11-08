// ------------------------- Modules ------------------------- //

const db = require('../models');

// ----------------------- Controllers ----------------------- //

// Find Restaurants and Populate Referenced Reviews
const indexRestaurants = (req, res) => {
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

const indexRestaurantsByParams = (req, res) => {
    db.Restaurant.find({
        $or: [{ name: req.query.name }, { city: req.query.city }]},
        (err, foundRestaurants) => {
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


const show = (req, res) => {
    db.Restaurant.findOne({ slug: req.params.slug }, (err, foundRestaurant) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: "Restaurant successfully found",
            data: foundRestaurant
        });
    })
    .populate('reviews')
};

module.exports = {
    indexRestaurants,
    indexRestaurantsByParams,
    show,
};