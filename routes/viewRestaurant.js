const express = require('express');
const ctrls = require('../controllers')
const router = express.Router();

router.get('/viewrestaurant/:id', ctrls.viewRestaurantCtrl.showOneRestaurant)

module.exports = router;