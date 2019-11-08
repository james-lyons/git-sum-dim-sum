const express = require('express');
const ctrls = require('../controllers')
const router = express.Router();
const adminRequired = require('../middleware/adminRequired');

router.get('/users', adminRequired, ctrls.adminCtrl.indexUsers)
router.delete('/users/:user_id', adminRequired, ctrls.adminCtrl.deleteUser);
router.get('/restaurants', adminRequired, ctrls.adminCtrl.indexRestaurants);
router.post('/restaurants/', adminRequired, ctrls.adminCtrl.addRestaurant);
router.delete('/restaurants/:restaurant_id', adminRequired, ctrls.adminCtrl.deleteRestaurant);

module.exports = router;