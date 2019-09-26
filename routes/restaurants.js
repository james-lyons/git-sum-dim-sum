const express = require('express');
const ctrls = require('../controllers')
const router = express.Router();

router.get('/', ctrls.restaurantCtrl.showRestaurants);
router.get('/:name', ctrls.restaurantCtrl.show);
router.get('/api/v1/restaurants', ctrls.restaurantCtrl.index);

module.exports = router;