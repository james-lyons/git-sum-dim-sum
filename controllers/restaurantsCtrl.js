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

const show = (req, res) => {
    db.Restaurant.findOne({_id: req.params.id})
        .populate({path: 'reviews',  populate: { path: 'author' }})
        .exec((error, foundRestaurant) => {
        if (error) return response.sendErrorResponse(res, error);
        res.render('viewRestaurant', {foundRestaurant, currentUser: req.session.currentUser});
    });
}

module.exports = {
    index,
    show,
};