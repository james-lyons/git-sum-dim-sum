// ------------------------- Modules ------------------------- //

const db = require('../models');
const response = require('../routes/response');

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
    console.log(req.query)
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
    db.Restaurant.findOne({_id: req.params.id})
        .populate({path: 'reviews',  populate: { path: 'author' }})
        .exec((error, foundRestaurant) => {
        if (error) return response.sendErrorResponse(res, error);
        res.render('viewRestaurant', {foundRestaurant, currentUser: req.session.currentUser});
    });
}

module.exports = {
    indexRestaurants,
    indexRestaurantsByParams,
    show,
};