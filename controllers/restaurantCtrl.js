// ------------------------- Modules ------------------------- //

const db = require('../models');
const response = require('../routes/response');

// ----------------------- Controllers ----------------------- //

// Find Restaurants and Populate Referenced Reviews
const index = (req, res) => {
    db.Restaurant.find({})
        .populate('reviews')
        .exec((error, foundRestaurants) => {
        if (error) return response.sendErrorResponse(res, error);
        response.sendResponse(res, foundRestaurants);
    });
};

// Show All Restaurants
const showRestaurants = (req, res) => {
    db.Restaurant.find({})
        .populate('reviews')
        .exec((err, foundRestaurants) => {
        if (err) return res.sendErrorResponse(res, err);
        res.render('index', {foundRestaurants, currentUser: req.session.currentUser});
    });
};

// Show One Restaurant
const show = (req, res) => {
    db.Restaurant.findOne({name: req.params.name}, (error, foundRestaurant) => {
        if (error) return response.sendErrorResponse(res, error);
        response.sendResponse(res, foundRestaurant);
    });
}

module.exports = {
    index,
    show,
    showRestaurants,
};