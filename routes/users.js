const express = require('express');
const ctrls = require('../controllers')
const router = express.Router();

router.get('/api/v1/users', ctrls.userCtrl.showUsers);
router.delete('./api/v1/users:name', ctrls.userCtrl.deleteUser);

module.exports = router;