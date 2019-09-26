const db = require('../models');
const restaurantList = require('./dimsum.json');
const reviewList = require('./reviews.json');

db.Restaurant.remove({}, () => {
	restaurantList.forEach(restaurant => {
		db.Restaurant.create(restaurant, (error, createdRestaurant) => {
			if (error) return console.log(error);
			console.log(createdRestaurant);
		});
	});
});

//seeds reviews
db.Review.remove({}, () => {
	reviewList.forEach(review => {
		db.Review.create(review, (error, createdReview) => {
			if (error) return console.log(error);
			console.log(createdReview);
		});
	});
});