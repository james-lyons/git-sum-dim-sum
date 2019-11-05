const db = require('../models');
const restaurantList = require('./dimsum.json');
const adminList = require('./admin.json');

db.Restaurant.remove({}, () => {
	restaurantList.forEach(restaurant => {
		db.Restaurant.create(restaurant, (err, createdRestaurants) => {
			if (err) return res.status(500).json({
				status: 500,
				message: err
			});

			return res.status(200).json({
				status: 200,
				message: 'Restaurants successfully created.',
				data: createdRestaurants
			});
		});
	});
});

//seeds admins
db.User.remove({}, () => {
	adminList.forEach(admin => {
		db.User.create(admin, (err, createdAdmin) => {
			if (err) return restaurantList.status(500).json({
				status: 500,
				message: err
			});

			return (200).json({
				status: 200,
				message: 'Admin successfully created.',
			});
		});
	});
});