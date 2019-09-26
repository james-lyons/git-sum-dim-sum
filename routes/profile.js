const express = require('express');
const router = express.Router();
const ctrls = require('../controllers')

router.get('/', ctrls.profileCtrl.showProfile);

module.exports = router;