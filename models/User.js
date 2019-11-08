const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        required: true,
        default: '../images/dumpling_icon.png'
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
            required: false,
        }
    ],
    sign_up_date: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;