const express = require('express');
const ctrls = require('../controllers')
const router = express.Router();

router.get('/users', ctrls.adminCtrl.indexUsers)
router.delete('/users/:user_id', ctrls.adminCtrl.deleteUser);
router.get('/restaurants', ctrls.adminCtrl.indexRestaurants);
router.post('/restaurants/', ctrls.adminCtrl.addRestaurant);
router.delete('/restaurants/:restaurant_id', ctrls.adminCtrl.deleteRestaurant);

module.exports = router;