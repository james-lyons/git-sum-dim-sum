const express = require('express');
const ctrls = require('../controllers')
const router = express.Router();

router.get('/signup', ctrls.accountsCtrl.newUser);
router.post('/signup', ctrls.accountsCtrl.createUser);
router.get('/login', ctrls.accountsCtrl.newSession);
router.post('/login', ctrls.accountsCtrl.createSession);
router.get('/logout', ctrls.accountsCtrl.deleteSession);

module.exports = router;