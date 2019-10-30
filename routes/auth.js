const express = require('express');
const ctrls = require('../controllers')
const router = express.Router();

router.post('/register', ctrls.authCtrl.register);
router.post('/login', ctrls.authCtrl.login);
router.post('/logout', ctrls.authCtrl.logout);

module.exports = router;