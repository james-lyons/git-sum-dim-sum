// ------------------------- Modules ------------------------- //

const db = require('../models');
const response = require('../routes/response');

// ----------------------- Controllers ----------------------- //

// Find All Reviews
const index = (req, res) => {
    db.Review.find({}, (error, foundReviews) => {
        if (error) return response.sendErrorResponse(res, error);
        response.sendResponse(res, foundReviews);
    });
};

// Find One Review
const show = (req, res) => {
    db.Review.findOne({name: req.params.name}, (error, foundReviews) => {
        if (error) return response.sendErrorResponse(res, error);
        response.sendResponse(res, foundReviews);
    });
};

// Create A Review
const create = (req, res) => {
    if (!req.session.currentUser) {
        return console.log(req);
    }
    const review = {author: req.session.currentUser._id, ...req.body}
    db.Review.create(review, (error, createdReviews) => {
        if (error) return res.sendErrorResponse(res, error);
        db.Restaurant.findById(req.body.restaurant, (error, foundRestaurant)=>{
            if (error) return res.sendErrorResponse(res, error);
            foundRestaurant.reviews.push(createdReviews._id)
            foundRestaurant.save()
        });
        db.User.findById(req.session.currentUser._id, (error, foundUser)=>{
            if (error) return res.sendErrorResponse(res, error);
            foundUser.reviews.push(createdReviews._id)
            foundUser.save()
        });
        response.sendResponse(res, createdReviews);
    });
};

// Delete A Review
const deleteReview = (req, res) => {
    db.Review.findOneAndDelete({_id: req.params._id}, (error, deletedReviews) => {
        if(error) return response.sendErrorResponse(res, error);
        response.sendResponse(res, deletedReviews);
    });
};

// Edit A Review
const editReview = (req, res) => {
    console.log(req.params._id);
    db.Review.findOneAndUpdate({_id: req.params._id}, req.body, (error, editedReviews) => {
        if(error) return response.sendErrorResponse(res, error);
        response.sendResponse(res, editedReviews);
    });
};

module.exports = {
    index: index,
    show: show,
    create: create,
    delete: deleteReview,
    edit: editReview

};