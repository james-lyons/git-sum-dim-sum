mongoose = require('mongoose');
const MONGO_URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/git-sum-dim-sum';

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => console.log('mongoDB connected...'))
    .catch((err) => console.log(err))

module.exports = {
    User: require('./User'),
    Restaurant: require('./Restaurant'),
    Review: require('./Review')
};