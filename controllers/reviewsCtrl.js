// ------------------------- Modules ------------------------- //

const db = require('../models');
const response = require('../routes/response');

// ----------------------- Controllers ----------------------- //

// Find All Reviews
const indexReviews = (req, res) => {
    db.Review.find({}, (error, foundReviews) => {
        if (error) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again'
        });

        res.status(200).json({
            status: 200,
            message: 'Reviews successfully found',
            data: foundReviews
        });
    });
};

// Create A Review
const createReview = (req, res) => {
    const review = {
        author: req.session.currentUser._id,
        author_name: req.session.currentUser.name,
        ...req.body }

    db.Review.create(review, (error, createdReview) => {
        if (error) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again'
        });

        db.Restaurant.findById(req.body.restaurant_id, (error, foundRestaurant) => {
            if (error) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again'
            });

            foundRestaurant.reviews.push(createdReview.id)
            foundRestaurant.save()
        });

        db.User.findById(req.session.currentUser._id, (error, foundUser) => {
            if (error) return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again.',
            });

            foundUser.reviews.push(createdReview._id)
            foundUser.save()
        });
    
        res.status(201).json({
            status: 201,
            message: 'Successfully created review',
            data: createdReview
        });
    });
};

// Edit A Review
const editReview = (req, res) => {
    db.Review.findByIdAndUpdate(req.params.id, req.body, (error, editedReview) => {
        if (error) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.',
        });

        res.status(202).json({
            status: 202,
            message: 'Successfully edited review.',
            data: editedReview
        });
    });
};

// Delete A Review
const deleteReview = (req, res) => {
    db.Review.findByIdAndDelete(req.params.id, (error, deletedReview) => {
        if (error) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: 'Successfully deleted review.',
            data: deletedReview
        });
    });
};

module.exports = {
    indexReviews,
    createReview,
    editReview,
    deleteReview,
};