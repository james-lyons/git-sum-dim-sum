// ------------------------- Modules ------------------------- //

const db = require('../models');
const response = require('../routes/response');

// ----------------------- Controllers ----------------------- //

// Shows All Users
const showUsers = (req, res) => {
    db.User.find({}, (error, foundUsers) => {
        if (error) return response.sendErrorResponse(res, error);
        response.sendResponse(res, foundUsers);
    });
};

// Deletes One User
const deleteUser = (req, res) => {
    db.User.findOneAndDelete({name: req.params.name}, (error, deletedUser) => {
        if (error) return response.sendErrorResponse(res, error);
        response.sendResponse(res, deletedUser);
    });
};

module.exports = {
    showUsers,
    deleteUser
}