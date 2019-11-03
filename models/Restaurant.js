const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        require: true,
    }, 
    address: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true,
    },
    hours: {
        type: String,
        require: true,
    },
    menuLink: {
        type: String,
        require: true,
    },
    lat: {
        type: String,
        require: true,
    },
    lng: {
        type: String,
        require: true,
    },
    averageRating: {
        type: Number,
        require: true,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
        require: false,
    }],
    image: {
        type: String,
        require: true,
    },
    slug: {
        type: String,
        required: true,
    }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;