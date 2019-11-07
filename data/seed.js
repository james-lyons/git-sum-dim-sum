const db = require('../models');
const restaurantList = require('./dimsum.json');
const adminList = require('./admin.json');

db.Restaurant.deleteMany({}, () => {
	restaurantList.forEach(restaurant => {
		db.Restaurant.create(restaurant, (err, createdRestaurants) => {
			if (err) return console.log(err)
		});
	});
});

//seeds admins
db.User.deleteMany({}, () => {
	adminList.forEach(admin => {
		db.User.create(admin, (err, createdAdmin) => {
			if (err) return console.log(err)
		});
	});
});