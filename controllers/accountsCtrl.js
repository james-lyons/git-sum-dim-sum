// ------------------------- Modules ------------------------- //

const db = require('../models');
const response = require('../routes/response');

// ----------------------- Controllers ----------------------- //

// Get User for profile page
const show = (req, res) => {
    db.User.findById(req.session.currentUser._id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again.'
        });

        res.status(200).json({
            status: 200,
            message: 'Successfully found user',
            data: foundUser
        })
    })
    .populate('reviews')
};

// Deletes One User
const deleteUser = (req, res) => {
    db.User.findOneAndDelete({name: req.params.name}, (err, deletedUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: 'Something went wrong, please try again'
        });

        return res.status(202).json({
            status: 202,
            message: 'Account successfully deleted'
        });
    });
};

module.exports = {
    show,
    deleteUser
}