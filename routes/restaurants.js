const express = require('express');
const ctrls = require('../controllers')
const router = express.Router();

router.get('/', ctrls.restaurantsCtrl.index);
router.get('/:id', ctrls.restaurantsCtrl.show)

module.exports = router;