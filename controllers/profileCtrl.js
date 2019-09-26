// ------------------------- Modules ------------------------- //

const db = require('../models');

// ----------------------- Controllers ----------------------- //

// GET User Profile
const showProfile = (req, res) => {
    if (!req.session.currentUser) {
        return res.redirect('/accounts/login');
    };
    db.User.findById(req.session.currentUser._id) 
        .populate({path: 'reviews',  populate: { path: 'author' }}).exec(
        (error, foundUser) => {
        if (error) return res.render('index', { errors: [{
            message: 'Something went wrong, please try again'
        }]})
        res.render('profile/show', { currentUser: foundUser });
    });
};

module.exports = {
    showProfile,
}