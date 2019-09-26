const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: false,
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant',
        require: true,
    },
    reviewText: {
        type: String,
        require: true,
    },
    starRating: {
        type: Number,
        require: false,
    },
    timePosted: {
        type: Date,
        default: Date.now,
    }
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;