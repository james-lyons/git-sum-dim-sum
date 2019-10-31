const express = require('express');
const ctrls = require('../controllers')
const router = express.Router();

router.get('/', ctrls.restaurantsCtrl.indexRestaurants);
router.get('/search', ctrls.restaurantsCtrl.indexRestaurantsByParams);
router.get('/:id', ctrls.restaurantsCtrl.show)

module.exports = router;