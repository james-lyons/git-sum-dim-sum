// ------------------------- Modules ------------------------- //

const db = require('../models');
const response = require('../routes/response');

// ----------------------- Controllers ----------------------- //

// Shows One Restaurant
const showOneRestaurant = (req, res) => {
    db.Restaurant.findOne({_id: req.params.id})
        .populate({path: 'reviews',  populate: { path: 'author' }})
        .exec((error, foundRestaurant) => {
        if (error) return response.sendErrorResponse(res, error);
        res.render('viewRestaurant', {foundRestaurant, currentUser: req.session.currentUser});
    });
}

module.exports = {
    showOneRestaurant
}